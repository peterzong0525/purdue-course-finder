package com.purduecoursefinder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import lombok.extern.flogger.Flogger;

@SpringBootApplication
@Flogger
public class PurdueCourseFinderApplication {

	public static void main(String[] args) {
		SpringApplication.run(PurdueCourseFinderApplication.class, args);
		log.atInfo().log("Application started!");
	}

}
