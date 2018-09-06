package org.apache.cordova.selfscan;
import com.google.zxing.WriterException;
import org.apache.cordova.selfscan.zxing.android.CaptureActivity;
import org.apache.cordova.selfscan.zxing.android.Intents;
import org.apache.cordova.selfscan.zxing.encode.CodeCreator;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import org.apache.cordova.R;

public class ScanActivity extends Activity {
    private static final int REQUEST_CODE_SCAN = 0x0000;
    private static final String DECODED_CONTENT_KEY = "codedContent";
    private static final String DECODED_BITMAP_KEY = "codedBitmap";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Intent intent = new Intent(ScanActivity.this,
                CaptureActivity.class);
        startActivityForResult(intent, REQUEST_CODE_SCAN);
    }
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        // 扫描二维码/条码回传
        if (requestCode == REQUEST_CODE_SCAN && resultCode == RESULT_OK) {
            if (data != null) {
                String content = data.getStringExtra(DECODED_CONTENT_KEY);
                // Bitmap bitmap = data.getParcelableExtra(DECODED_BITMAP_KEY);
                // qrCoded.setText("解码结果： \n" + content);
                // qrCodeImage.setImageBitmap(bitmap);
                Intent mIntent = new Intent();
               // Toast.makeText(this, "扫描成功,返回值为："+content, Toast.LENGTH_SHORT).show();
                mIntent.putExtra("result", content);
                setResult(RESULT_OK, mIntent);
                finish();
            }
        }else{
            Intent mIntent = new Intent();
            // Toast.makeText(this, "扫描成功,返回值为："+content, Toast.LENGTH_SHORT).show();
            mIntent.putExtra("result", "back");
            setResult(RESULT_OK, mIntent);
            finish();
        }
    }


}