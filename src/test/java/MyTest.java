/**
 * Created by Zephery on 2016/6/9.
 */

import java.io.Reader;
import java.util.List;

import com.myblog.dao.BlogMapper;
import com.myblog.dao.CategoryMapper;
import com.myblog.dao.ImageMapper;
import com.myblog.entity.Blog;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.Before;
import org.junit.Test;

public class MyTest {

    private SqlSessionFactory sqlSessionFactory;
    private Reader reader;

    // 此方法是在执行findUserByIdTest之前执行
    @Before
    public void setUp() throws Exception {
        reader = Resources.getResourceAsReader("testConfig.xml");
        // 创建SqlSessionFcatory
        sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
    }

    public void TestFindOrdersUser() {
        SqlSession sqlSession = sqlSessionFactory.openSession();
        // 创建代理对象
        BlogMapper blogMapper = sqlSession.getMapper(BlogMapper.class);
        CategoryMapper categoryMapper = sqlSession.getMapper(CategoryMapper.class);
        ImageMapper imageMapper = sqlSession.getMapper(ImageMapper.class);
        List<Blog> blogList=blogMapper.getNewBlog();
        String catalogname= categoryMapper.getCategoryname(1);
        System.out.println(catalogname);
        sqlSession.commit();
        sqlSession.close();
    }
    public static void main(String args[]){
        MyTest myTest=new MyTest();
        myTest.TestFindOrdersUser();
    }
}