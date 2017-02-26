import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

/**
 * Created by Zephery on 2017/1/27.
 */
public class ForTest {
    public static void main(String args[]) throws Exception {
        String datestr = "Mon Aug 15 11:24:39 CST 2016";//Date的默认格式显示
        Date date = new SimpleDateFormat("EEE MMM dd HH:mm:ss Z yyyy", Locale.UK).parse(datestr);
//格式化
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String sDate = sdf.format(date);
        System.out.println(sDate);
    }
}
