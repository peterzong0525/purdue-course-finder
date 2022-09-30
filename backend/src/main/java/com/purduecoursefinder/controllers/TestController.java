package com.purduecoursefinder.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/test")
public class TestController {
	@GetMapping()
	public String index(@RequestParam(name = "number", required = false) String number) {
		int num;
		if (number == null) {
			return "It works!";
		}

		try {
			num = Integer.parseInt(number);
			return "It works! Param: " + num;
		} catch (Exception e) {
			return "Error: Provided parameter is not an integer";
		}
	}
}
