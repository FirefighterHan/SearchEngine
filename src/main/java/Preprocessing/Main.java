package Preprocessing;

import java.io.FileReader;
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.ArrayList;
import java.util.Set;
import java.util.HashSet;


public class Main {

    public static void main(String[] args) throws IOException{
        // Directory to folder with multiple hadith text documents
        String folderPath = "D:\\Google Classroom\\degree\\Sem 5\\csp600 - Project Formulation\\Development\\FileImport\\SahihMuslim";

        // Set to store all tokenized words from all rows
        Set<String> allTokenizedText = new HashSet<>();
        
        // Get list of files in the directory
        File directory = new File(folderPath);
        File[] files = directory.listFiles();
        
        if (files != null) {
            for (File file : files) {
                // Check if the file is a text document
                if (file.isFile() && file.getName().toLowerCase().endsWith(".txt")) {
                    // Process the text document
                    processTextDocument(file, allTokenizedText);
                }
            }
        }
        
        // Specify the desired output file path
        String outputPath = "D:\\Google Classroom\\degree\\Sem 5\\csp600 - Project Formulation\\wordlist5.xlsx";

        // Write the tokenized words to an Excel file
        WordLister.writeTokenizedWordsToExcel(new ArrayList<>(allTokenizedText), outputPath);
    }
    
    private static void processTextDocument(File file, Set<String> allTokenizedText) throws IOException {
        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = reader.readLine()) != null) {
                // Preprocess the line using the TextProcessor class
                String stopwordsRemovedText = TextProcessor.preprocessStopwordsRemovalText(line);
                List<String> tokenizedText = TextProcessor.preprocessTokenizeText(stopwordsRemovedText);

                allTokenizedText.addAll(tokenizedText);
            }
        }
    }
    
}