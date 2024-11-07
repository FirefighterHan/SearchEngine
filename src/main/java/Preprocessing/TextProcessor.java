package Preprocessing;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

public class TextProcessor {

    // Store stopwords loaded from a file
    private static final List<String> stopWords = loadStopwordsFromFile("D:\\Google Classroom\\degree\\Sem 5\\csp600 - Project Formulation\\Development\\FileImport\\StopwordsRemoval\\StopwordsRemoval.txt");
	
    private static List<String> loadStopwordsFromFile(String filePath) {
	    	List<String> stopwords = new ArrayList<>();
	        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
	            String line;
	            while ((line = reader.readLine()) != null) {
	                stopwords.add(line.trim());
	            }
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        return stopwords;
	    }
    
    public static String preprocessStopwordsRemovalText(String text) {
        // Apply stopwords removal preprocessing
        String withoutStopwords = removeStopwords(text);
        return withoutStopwords;
    }
    
    public static List<String> preprocessTokenizeText(String text) {
        // Apply tokenization preprocessing
        List<String> withTokenize = tokenizeText(text);
        return withTokenize;
    }

    private static String removeStopwords(String text) {
        String[] words = text.split("[\\W]+");
        StringBuilder result = new StringBuilder();
        for (String word : words) {
            if (!stopWords.contains(word.toLowerCase())) {
                result.append(word).append(" ");
            }
        }
        return result.toString().trim();
    }
    
    private static List<String> tokenizeText(String text) {
    	StringTokenizer tokenizer = new StringTokenizer(text);
    	List<String> tokens = new ArrayList<>();
    	while (tokenizer.hasMoreTokens()) {
    		tokens.add(tokenizer.nextToken());
    	}
    	return tokens;
    }
    
    
}
