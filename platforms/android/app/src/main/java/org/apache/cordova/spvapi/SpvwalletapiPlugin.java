package org.apache.cordova.spvapi;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaArgs;
import org.apache.cordova.CordovaWebView;
import org.elastos.elastoswallet.IDidManager;
import org.elastos.elastoswallet.IdManagerFactory;
import org.json.JSONException;
import android.content.Intent;

import org.elastos.elastoswallet.ElastosWalletUtils;
import org.elastos.elastoswallet.IMasterWallet;
import org.elastos.elastoswallet.ISubWallet;
import org.elastos.elastoswallet.ISubWalletCallback;
import org.elastos.elastoswallet.MasterWalletManager;
import org.elastos.elastoswallet.WalletException;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class SpvwalletapiPlugin extends CordovaPlugin {
    private IMasterWallet mCurrentMasterWallet;
    private IDidManager mDidManager = null;
    private MasterWalletManager mWalletManager;
    //String language = "chinese";
    private ArrayList<IMasterWallet> mMasterWalletList = new ArrayList<IMasterWallet>();
    private Map<String, ISubWallet> mSubWalletMap = new HashMap<String, ISubWallet>();
    private String mRootPath = null;
    private int intil = 0;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        //1. 初始化钱包所需的数据
        mRootPath = this.cordova.getActivity().getApplicationContext().getFilesDir().getParent();
        ElastosWalletUtils.InitConfig(this.cordova.getActivity(), mRootPath);
        //2. 传递一个可读写的路径，创建 MasterWalletManager
        mWalletManager = new MasterWalletManager(mRootPath);
        //MyUtil.SetCurrentMasterWalletManager(mWalletManager);
        mMasterWalletList = mWalletManager.GetAllMasterWallets();
        if (mMasterWalletList != null) {
            mCurrentMasterWallet = mMasterWalletList.get(0);
            if (mCurrentMasterWallet != null) {
                mDidManager = IdManagerFactory.CreateIdManager(mCurrentMasterWallet, mRootPath);
            }
        } else {
            mMasterWalletList = new ArrayList<IMasterWallet>();
        }
    }
    @Override
    public boolean execute(String action, CordovaArgs args, final CallbackContext callbackContext) throws JSONException {
        //创建助记词
        if ("creatememwords".equals(action)) {
            try {
                try {
                    String mnemonic = mWalletManager.GenerateMnemonic(args.getString(0));
                    callbackContext.success(mnemonic);
                } catch (WalletException e) {
                    e.printStackTrace();
                }
                return true;
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("0");
                return true;
            }
            //获取主钱包，并做判断
        } else if ("getallmasterwallet".equals(action)) {
            try {
                try {
                    //System.out.println("自钱包："+mMasterWalletList.));
                    callbackContext.success(mMasterWalletList.toString());
                } catch (WalletException e) {
                    e.printStackTrace();
                }
                return true;
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("0");
                return true;
            }
            // 创建主钱包
        } else if ("createmasterwallet".equals(action)) {
            try {
                mCurrentMasterWallet = mWalletManager.CreateMasterWallet(args.getString(0), args.getString(1), args.getString(2)
                        , args.getString(3), args.getString(4));
                //mWalletManager.CreateMasterWallet("","");
                createsubwallet("ELA", args.getString(3), false, 10000);
            } catch (WalletException e) {
                e.printStackTrace();
                callbackContext.success(e.GetErrorInfo());
                return true;
            }
            if (mCurrentMasterWallet != null) {
                mMasterWalletList.add(mCurrentMasterWallet);
                initDidManager(mRootPath);
                callbackContext.success();
            } else {
                callbackContext.error("CreateMasterWallet failed.");
            }
            //获取钱包名称(ID)
        } else if ("walletinfo".equals(action)) {
            try {
                try {
                    callbackContext.success(mMasterWalletList.get(0).GetId());
                } catch (WalletException e) {
                    e.printStackTrace();
                    callbackContext.success(e.GetErrorInfo());
                    return true;
                }
            } catch (Exception ea) {
                ea.printStackTrace();
                callbackContext.error("get walletinfo failed!");
                return true;
            }
            //获取指定子钱包列表
        } else if ("subwalletlist".equals(action)) {
            if (mCurrentMasterWallet != null) {
                JSONArray json = getallsubwalletlist();
                System.out.println("子钱包："+json);
                callbackContext.success(json.toString());
                return true;
            } else {
                callbackContext.success("error");
                return true;
            }
            //获取指定子钱包地址
        } else if ("getaddress".equals(action)) {
            try {
                try {
                    getallsubwalletobj();
                    callbackContext.success(mSubWalletMap.get(args.getString(0)).GetAllAddress(0, 1).toString());
                    return true;
                } catch (WalletException e) {
                    e.printStackTrace();
                    callbackContext.success(e.GetErrorInfo());
                    return true;
                }
            } catch (Exception ea) {
                ea.printStackTrace();
                callbackContext.error("get address failed!");
                return true;
            }
            //获取指定子钱包余额
        } else if ("getbalance".equals(action)) {
            try {
                JSONArray njson = getallsubwalletlist();
                for (int i = 0; i < njson.length(); i++) {
                    JSONObject jsonobj = (JSONObject) njson.get(i);
                    if (jsonobj.get("chainid").equals(args.get(0))) {
                        callbackContext.success(jsonobj.get("balance").toString());
                        break;
                    } else {
                        callbackContext.success(0);
                    }
                }
                return true;
            } catch (Exception ea) {
                ea.printStackTrace();
                callbackContext.error("get balance failed!");
                return true;
            }
            //转账交易
        } else if ("sendcoin".equals(action)) {
            try {
                String txid = transaction(args.getString(0), args.getString(1), args.getString(2), args.getString(3), Long.parseLong(args.getString(4)), args.getString(5));
                callbackContext.success(txid);
                return true;

            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("error");
                return true;
            }
            //获取指定交易信息
        } else if ("gettractioninfo".equals(action)) {
            try {
                String txdetail = transactioninfobytxid(args.getString(0), args.getString(1), args.getInt(2));
                callbackContext.success(txdetail);
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("error");
                return true;
            }
            //获取指定子钱包的交易列表
        } else if ("getalltractionlist".equals(action)) {
            try {
                String transactionlist = transactionlist(args.getString(0));
                callbackContext.success(transactionlist);
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("error");
                return true;
            }
            //导出指定钱包的助记词
        } else if ("exportwalletwithmnemonic".equals(action)) {
            try {
                String mnemonic = exportmnemonic(args.getString(0));
                callbackContext.success(mnemonic);
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("export mnemonic failed!");
                return true;
            }
            //导出指定钱包的私钥文件
        } else if ("exportwalletwithkeystore".equals(action)) {
            try {
                String keystorefile = exportkeystore(args.getString(0), args.getString(1));
                callbackContext.success(keystorefile);
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("export keystorefile failed!");
                return true;
            }
            //获取交易手续费
        } else if ("getfee".equals(action)) {
            try {
                long fee = getfee(args.getString(0), args.getString(1), args.getString(2), args.getLong(3), args.getString(4));
                callbackContext.success(String.valueOf(fee));
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("error");
                return true;
            }
            //导入指定钱包的私钥文件
        } else if ("importwalletwithkeystore".equals(action)) {
            try {
                mCurrentMasterWallet = mWalletManager.ImportWalletWithKeystore(args.getString(0), args.getString(1), args.getString(2)
                        , args.getString(3), args.getString(4));
                //mWalletManager.ImportWalletWithKeystore("ELA","","","","");
                createsubwallet("ELA", args.getString(3), false, 10000);
                callbackContext.success("1");
            }
            catch (WalletException e) {
                e.printStackTrace();
                callbackContext.success(e.GetErrorInfo());
                return true;
            }
            if (mCurrentMasterWallet != null) {
                mMasterWalletList.add(mCurrentMasterWallet);
                callbackContext.success();
            }else {
                callbackContext.error("ImportWalletWithKeystore failed.");
            }
            //导入指定钱包的助记词
        } else if ("importwalletwithmnemonic".equals(action)) {
            try {
                mCurrentMasterWallet = mWalletManager.ImportWalletWithMnemonic(args.getString(0), args.getString(1), args.getString(2)
                        , args.getString(3), args.getString(4));
               // mWalletManager.ImportWalletWithMnemonic("ELA","","","","");
                               createsubwallet("ELA", args.getString(3), false, 10000);
                 //mMasterWalletList.add(mCurrentMasterWallet);
                callbackContext.success("1");
            }
            catch (WalletException e) {
                e.printStackTrace();
                callbackContext.success( e.GetErrorInfo());
                return true;
            }
            if (mCurrentMasterWallet != null) {
                mMasterWalletList.add(mCurrentMasterWallet);
                callbackContext.success();
            }
            else {
                callbackContext.error("ImportWalletWithMnemonic failed.");
            }
        } else if ("judgewalletadr".equals(action)) {
            try {
                boolean isadr = judgewalletadr(args.getString(0));
                if (isadr) {
                    callbackContext.success("1");
                } else {
                    callbackContext.success("0");
                }
                return true;
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("judge failed!");
                return true;
            }
            //监听交易状态
        } else if ("listentransaction".equals(action)) {
            try {
                ArrayList<ISubWallet> list = mCurrentMasterWallet.GetAllSubWallets();
                for (int i = 0; i < list.size(); i++) {
                    ISubWallet subWallet = list.get(i);
                }
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("error");
                return true;
            }
            //更改新密码
        } else if ("changepaypassword".equals(action)) {
            try {

                 String changepwdrs = changePassword(args.getString(0),args.getString(1));
                 callbackContext.success(changepwdrs);
                return true;

            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("change password failed!");

                return true;
            }
            //通过钱包地址获取余额
        } else if ("removewallet".equals(action)) {
            try {
                String yn = delwallet();
                callbackContext.success();
                //return false;
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("0");
                //return true;
            }
        }
        return super.execute(action, args, callbackContext);
    }

    private void initDidManager(String rootPath) {
        if (mDidManager == null && mCurrentMasterWallet != null) {
            mDidManager = IdManagerFactory.CreateIdManager(mCurrentMasterWallet, rootPath);
        }
    }
    //获取所有指定钱包资产列表
    public void getallsubwalletobj() {
        mSubWalletMap.clear();
        ArrayList<ISubWallet> list = mCurrentMasterWallet.GetAllSubWallets();
        JSONArray json = new JSONArray();
        for (int i = 0; i < list.size(); i++) {
            ISubWallet subWallet = list.get(i);
            if (subWallet != null) {
                JSONObject jsonObject = new JSONObject();
                mSubWalletMap.put(subWallet.GetChainId(), subWallet);
            }
        }
    }

    //获取所有指定钱包资产列表
    public JSONArray getallsubwalletlist() throws JSONException {
        mSubWalletMap.clear();
        ArrayList<ISubWallet> list = mCurrentMasterWallet.GetAllSubWallets();
        System.out.println("资产："+mCurrentMasterWallet.GetAllSubWallets().toString());
        JSONArray json = new JSONArray();
        for (int i = 0; i < list.size(); i++) {
            ISubWallet subWallet = list.get(i);
            if (subWallet != null) {
                JSONObject jsonObject = new JSONObject();
                mSubWalletMap.put(subWallet.GetChainId(), subWallet);
                jsonObject.put("chainid", subWallet.GetChainId());
                jsonObject.put("balance", (double) subWallet.GetBalance() / 100000000);
                json.put(jsonObject);
            }
        }
        return json;
    }

    //创建ELA默认自钱包
    public void createsubwallet(String chainid, String paypassword, boolean singleAddress, long feePerKb) {
        ISubWallet subWallet = mCurrentMasterWallet.CreateSubWallet(chainid, paypassword, singleAddress, feePerKb);
    }

    //导出助记词
    public String exportmnemonic(String armpassword) {
        try {
            String mnemonic = mWalletManager.ExportWalletWithMnemonic(mCurrentMasterWallet, armpassword);
            if (mnemonic != null) {
                return mnemonic;
            } else {
                return "ExportWalletWithMnemonic failed.";
            }
        } catch (WalletException e) {
            e.printStackTrace();
            return "error";
        }
    }

    //导出私钥文件
    public String exportkeystore(String armpassword, String paypassword) {
        try {
            String keystoreContent = mWalletManager.ExportWalletWithKeystore(mCurrentMasterWallet, armpassword, paypassword);
            return keystoreContent;
        } catch (WalletException e) {
            e.printStackTrace();
            return "error";
        }
    }

    //更改支付密码
    public String changePassword(String oldpwd, String newpwd) {
        try {
            mCurrentMasterWallet.ChangePassword(oldpwd, newpwd);
            return "1";
        } catch (WalletException e) {
            e.printStackTrace();
            return "0";
        }
    }

    //构建交易，返回手续费
    public long getfee(String chainid, String fromaddress, String toaddress, long amount, String momo) {
        ArrayList<ISubWallet> list = mCurrentMasterWallet.GetAllSubWallets();
       // mCurrentMasterWallet.
        long fee = -1;
        for (int i = 0; i < list.size(); i++) {
            ISubWallet subWallet = list.get(i);
            if (subWallet.GetChainId().equals(chainid)) {

                String transaction = subWallet.CreateTransaction("", toaddress, amount, momo, "");
                fee = subWallet.CalculateTransactionFee(transaction, 10000);
                break;
            }
        }
        return fee;
    }

    //构建交易，直接发送
    public String transaction(String chainid, String paypassword, String fromaddress, String toaddress, long amount, String momo) {
        ArrayList<ISubWallet> list = mCurrentMasterWallet.GetAllSubWallets();
        String txid = "";
        for (int i = 0; i < list.size(); i++) {
            ISubWallet subWallet = list.get(i);
            if (subWallet.GetChainId().equals(chainid)) {
                System.out.println("Start create transaction:"+amount);
                String transaction = subWallet.CreateTransaction("", toaddress, amount, momo, "");
                System.out.println("Start get fee :");
                long fee = subWallet.CalculateTransactionFee(transaction, 10000);
                txid = subWallet.SendRawTransaction(transaction, fee, paypassword);
                System.out.println("Get transaction result：" + txid);
                System.out.println("End transaction");
                break;
            }
        }
        return txid;
    }

    //获得指定钱包地址的的交易记录
    public String transactionlist(String chainid) {
        ArrayList<ISubWallet> list = mCurrentMasterWallet.GetAllSubWallets();
        String transactionlists = "";
        JSONObject jsonObject = new JSONObject();
        JSONArray json = new JSONArray();
        for (int i = 0; i < list.size(); i++) {
            ISubWallet subWallet = list.get(i);
            String addresss = subWallet.GetAllAddress(0, 1);
            if (subWallet.GetChainId().equals(chainid)) {
                try {
                    jsonObject.put("walletname", mMasterWalletList.get(0).GetId().toString());
                    jsonObject.put("balance", (double) subWallet.GetBalance() / 100000000);
                    JSONObject jsonObjecta = new JSONObject(addresss);
                    transactionlists = subWallet.GetAllTransaction(0, 100, "");
                    JSONObject jsonObjectb = new JSONObject(transactionlists);
                    JSONArray lista = jsonObjectb.getJSONArray("Transactions");
                    for (int j = 0; j < lista.length(); j++) {
                        JSONObject jsonObjectc = new JSONObject();
                        String txhash = lista.getJSONObject(j).getString("TxHash").toString();
                        StringBuilder sb = new StringBuilder(txhash);
                        jsonObjectc.put("adddate", Long.parseLong(lista.getJSONObject(j).getString("Timestamp")) * 1000);
                        String inoroutamount = "";
                        String inorout = "";
                        System.out.println("交易记录Summary："+lista.getJSONObject(j).getJSONObject("Summary").toString());
                        if (lista.getJSONObject(j).getJSONObject("Summary").getJSONObject("Incoming").getLong("Amount")==0) {
                            inoroutamount = lista.getJSONObject(j).getJSONObject("Summary").getJSONObject("Outcoming").getString("Amount");
                            inorout = "out";
                        } else {
                            inoroutamount = lista.getJSONObject(j).getJSONObject("Summary").getJSONObject("Incoming").getString("Amount");
                            inorout = "in";
                        }
                        jsonObjectc.put("shorttxhash", sb.replace(6, 60, "***"));
                        jsonObjectc.put("txhash", lista.getJSONObject(j).getString("TxHash"));
                        jsonObjectc.put("confirmstatus", lista.getJSONObject(j).getJSONObject("Summary").getString("Status"));
                        jsonObjectc.put("amount", Double.valueOf(inoroutamount) / 100000000);
                        jsonObjectc.put("inorout", inorout);
                        jsonObjectc.put("noid", j);
                        json.put(jsonObjectc);
                    }
                    jsonObject.put("transactionlistss", json.toString());
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                break;
            }
        }
        return jsonObject.toString();
    }
    //获得指定交易ID的的交易记录
    public String transactioninfobytxid(String chainid, String txid, Integer noid) {
        ArrayList<ISubWallet> list = mCurrentMasterWallet.GetAllSubWallets();
        String transactionlists = "";
        JSONObject jsonObject = new JSONObject();
        JSONArray json = new JSONArray();
        JSONObject jsonObjectc = new JSONObject();
        for (int i = 0; i < list.size(); i++) {
            ISubWallet subWallet = list.get(i);
            if (subWallet.GetChainId().equals(chainid)) {
                try {
                    String inoroutamount = "";
                    String inorout = "";
                    String toaddress = "";
                    transactionlists = subWallet.GetAllTransaction(0, 1, txid);
                    JSONObject jsonObjectb = new JSONObject(transactionlists);
                    JSONArray lista = jsonObjectb.getJSONArray("Transactions");
                    String txhash = lista.getJSONObject(0).getString("TxHash").toString();
                    StringBuilder sb = new StringBuilder(txhash);
                    //交易时间
                    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                    long lt = new Long(Long.parseLong(lista.getJSONObject(0).getString("Timestamp")) * 1000);
                    Date date = new Date(lt);
                    jsonObjectc.put("adddate", simpleDateFormat.format(date));
                    if (lista.getJSONObject(0).getJSONObject("Summary").getJSONObject("Incoming").getLong("Amount")==0) {
                        //交易数量
                        inoroutamount = lista.getJSONObject(0).getJSONObject("Summary").getJSONObject("Outcoming").getString("Amount");
                        toaddress = lista.getJSONObject(0).getJSONObject("Summary").getJSONObject("Outcoming").getString("ToAddress");
                        jsonObjectc.put("fee",  Double.valueOf(lista.getJSONObject(0).getJSONObject("Summary").getString("Fee"))/100000000);
                        //交易输出
                        inorout = "out";
                    } else {
                        //交易数量
                        inoroutamount = lista.getJSONObject(0).getJSONObject("Summary").getJSONObject("Incoming").getString("Amount");
                        toaddress = lista.getJSONObject(0).getJSONObject("Summary").getJSONObject("Incoming").getString("ToAddress");
                        jsonObjectc.put("fee", "0");
                        //交易输入
                        inorout = "in";
                    }
                    jsonObjectc.put("confirmnum", lista.getJSONObject(0).getJSONObject("Summary").getString("ConfirmStatus"));
                    jsonObjectc.put("confirmstatus", lista.getJSONObject(0).getJSONObject("Summary").getString("Status"));
                    jsonObjectc.put("shorttxhash", sb.replace(6, 60, "***"));
                    jsonObjectc.put("blockheight", lista.getJSONObject(0).getString("BlockHeight"));
                    jsonObjectc.put("txhash", lista.getJSONObject(0).getString("TxHash"));
                    jsonObjectc.put("amount", Double.valueOf(inoroutamount) / 100000000);
                    jsonObjectc.put("inorout", inorout);
                    jsonObjectc.put("toaddress", toaddress);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                break;
            }
        }
        return jsonObjectc.toString();
    }

    //判断钱包地址是否合法
    public boolean judgewalletadr(String adr) {
        boolean valid = mCurrentMasterWallet.IsAddressValid(adr);
        return valid;
    }
    //删除钱包
    public String delwallet(){
        try{
            System.out.println("删除成功！");
            mWalletManager.DestroyWallet("那你就叫");
            //mCurrentMasterWallet.DestroyWallet();
        } catch (WalletException paramJSONArray)
        {
            paramJSONArray.printStackTrace();
            System.out.println("删除！"+ paramJSONArray.GetErrorInfo());

            //paramCallbackContext.success(parseOneParam("ERRORCODE", paramJSONArray.GetErrorInfo()));
        }
        return "1";
    }
}