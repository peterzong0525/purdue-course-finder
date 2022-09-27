package com.purduecoursefinder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class PurdueCourseFinderApplication {

	public static void main(String[] args) {
		SpringApplication.run(PurdueCourseFinderApplication.class, args);
	}

}
