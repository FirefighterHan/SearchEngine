package Demo;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.common.SolrInputDocument;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.BufferedReader;

public class SolrIndexer {
	
	public static void main(String[] args) {
		// Folder containing text documents
		String folderPath = "D:\\Google Classroom\\degree\\Sem 5\\csp600 - Project Formulation\\Development\\FileImport\\SahihMuslimFull";
		 
		// Connect to Solr server
		String solrUrl = "http://localhost:8983/solr/demo3";
		SolrClient solrClient = new HttpSolrClient.Builder(solrUrl).build();
		boolean success = false;

        try {
        	// Get list of files in folder
        	File folder = new File(folderPath);
        	File[] files = folder.listFiles();
        	
        	if (files != null) {
        		for (File file : files) {
        			// Check if file is a txt document
        			if (file.isFile() && file.getName().toLowerCase().endsWith(".txt")) {
        				// Read the original text
        				String content = readOriginalTextFromFile(file);
        				// Index the text content into Solr
        				indexTextContent(content, solrClient);
        				success = true;
        			}
        		}
        	}
        } catch (IOException | SolrServerException e) {
            e.printStackTrace();
        } finally {
            // Close Solr client
            try {
                solrClient.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
            if (success) {
            	System.out.println("Text content indexed successfully to Solr.");
            }
        }
    }
	
	private static String readOriginalTextFromFile(File file) throws IOException {
		StringBuilder stringBuilder = new StringBuilder();
		try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
			String line;
			while ((line = reader.readLine()) != null) {
				stringBuilder.append(line).append("\n");
			}
		}
		return stringBuilder.toString();
	}
	
	private static void indexTextContent(String content, SolrClient solrClient) throws IOException, SolrServerException {
        // Index the text content into Solr
        SolrInputDocument doc = new SolrInputDocument();
        doc.addField("content", content); // Add field for text content
        solrClient.add(doc);
        // Commit the changes to Solr
        solrClient.commit();
    }
}




