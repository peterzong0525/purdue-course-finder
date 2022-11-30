package com.purduecoursefinder.services;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.purduecoursefinder.security.PCFUserDetails;

import lombok.extern.flogger.Flogger;

@Service
@Flogger
public class SuggestionService {
    @Value("${pcf.suggestions-directory}")
    private String suggestionsDirectory;
    
    public void saveSuggestion(String suggestion) {
        Object user = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        
        File file = new File(suggestionsDirectory + "/suggestions.txt");
        file.getParentFile().mkdirs();
        
        FileWriter fw;
        
        try {
            fw = new FileWriter(file, true);
        } catch(IOException e) {
            log.atWarning().log("Unable to write to suggestions.txt: " + e.getLocalizedMessage());
            return;
        }
        
        PrintWriter pw = new PrintWriter(fw);
        if (!(user instanceof PCFUserDetails)) {
            pw.write("Anonymous suggestion:\n" + suggestion + "\n");
        } else {            
            pw.write("Suggestion by \"" + ((PCFUserDetails) user).getUsername() + "\":\n" + suggestion + "\n");
        }
        pw.close();
    }
}
