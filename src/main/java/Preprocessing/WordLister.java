package Preprocessing;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

public class WordLister {

    public static void writeTokenizedWordsToExcel(List<String> allTokenizedText, String outputPath) {
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Tokenized Words");
            int rowIdx = 0;
            for (String word : allTokenizedText) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(word);
            }
            FileOutputStream fos = new FileOutputStream(outputPath);
            workbook.write(fos);
            fos.close();
            System.out.println("Tokenized words exported to Excel file.");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
