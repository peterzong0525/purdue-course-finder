package com.purduecoursefinder.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/test")
public class TestController {
	@GetMapping(value = "/")
	public String index(@RequestParam(name = "number", required = false) Integer number) {
		return "It works! " + (number == null ? "" : number);
	}
}
