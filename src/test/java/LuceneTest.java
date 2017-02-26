import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;

import java.nio.file.Paths;

/**
 * Created by Zephery on 2017/1/25.
 */
public class LuceneTest {
    private IndexWriter getWriter() throws Exception {
        Directory dir = FSDirectory.open(Paths.get("luuu"));
        Analyzer analyzer = new StandardAnalyzer();
        IndexWriterConfig config = new IndexWriterConfig(analyzer);
        IndexWriter writer = new IndexWriter(dir, config);
        return writer;
    }

    private void index() throws Exception {
        IndexWriter writer = getWriter();
        System.out.println();
    }

    public static void main(String args[]) {
        LuceneTest luceneTest = new LuceneTest();
        try {
            luceneTest.index();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
