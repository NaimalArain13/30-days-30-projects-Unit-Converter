"use client";
import { useState, ChangeEvent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// Conversion rates for various units categorized by length, weight, and volume
const conversionRates: Record<string, Record<string, number>> = {
  length: {
    "Millimeters (mm)": 1,
    "Centimeters (cm)": 10,
    "Meters (m)": 1000,
    "Kilometers (km)": 1000000,
    "Inches (in)": 25.4,
    "Feet (ft)": 304.8,
    "Yards (yd)": 914.4,
    "Miles (mi)": 1609344,
  },
  weight: {
    "Grams (g)": 1,
    "Kilograms (kg)": 1000,
    "Ounces (oz)": 28.3495,
    "Pounds (lb)": 453.592,
  },
  volume: {
    "Milliliters (ml)": 1,
    "Liters (l)": 1000,
    "Fluid Ounces (fl oz)": 29.5735,
    "Cups (cup)": 240,
    "Pints (pt)": 473.176,
    "Quarts (qt)": 946.353,
    "Gallons (gal)": 3785.41,
  },
};

// Unit types categorized by length, weight, and volume
const unitTypes: Record<string, string[]> = {
  length: [
    "Millimeters (mm)",
    "Centimeters (cm)",
    "Meters (m)",
    "Kilometers (km)",
    "Inches (in)",
    "Feet (ft)",
    "Yards (yd)",
    "Miles (mi)",
  ],
  weight: ["Grams (g)", "Kilograms (kg)", "Ounces (oz)", "Pounds (lb)"],
  volume: [
    "Milliliters (ml)",
    "Liters (l)",
    "Fluid Ounces (fl oz)",
    "Cups (cup)",
    "Pints (pt)",
    "Quarts (qt)",
    "Gallons (gal)",
  ],
};
export default function UnitConverter() {
  const [inputValue, setInputValue] = useState<null | number>(null);
  const [inputUnit, setInputUnit] = useState<null | string>(null);
  const [outputUnit, setOutputUnit] = useState<null | string>(null);
  const [convertedValue, setConvertedValue] = useState<number | null>(null);

  // Handlers
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseFloat(e.target.value));
  };
  const handleInputUnitChange = (value: string) => {
    setInputUnit(value);
  };
  const handleOutputUnitChange = (value: string) => {
    setOutputUnit(value);
  };

  const convertValue = (): void => {
    if (inputValue !== null && inputUnit && outputUnit) {
      let unitCat: null | string = null;

      for (const cat in unitTypes) {
        if (
          unitTypes[cat].includes(inputUnit) &&
          unitTypes[cat].includes(outputUnit)
        ) {
          unitCat = cat;
          break;
        }
      }
      if(unitCat){
        const baseValue = inputValue * conversionRates[unitCat][inputUnit];
        const result = baseValue / conversionRates[unitCat][outputUnit]
        setConvertedValue(result);
      }else{
        setConvertedValue(null);
        alert("Incompatible unit type selected");
      }
    }else{
      setConvertedValue(null);
      alert("Please fill all fields")
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="max-w-lg w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-white">
            Unit Converter
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Convert values between different units.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex space-x-4">
            <div className="w-full">
              <Label htmlFor="from" className="text-gray-800 dark:text-gray-200">
                From
              </Label>
              <Select onValueChange={handleInputUnitChange}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700">
                  {Object.entries(unitTypes).map(([category, units]) => (
                    <SelectGroup key={category}>
                      <SelectLabel className="text-gray-800 dark:text-gray-300">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectLabel>
                      {units.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full">
              <Label htmlFor="to" className="text-gray-800 dark:text-gray-200">
                To
              </Label>
              <Select onValueChange={handleOutputUnitChange}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700">
                  {Object.entries(unitTypes).map(([category, units]) => (
                    <SelectGroup key={category}>
                      <SelectLabel className="text-gray-800 dark:text-gray-300">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectLabel>
                      {units.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="value" className="text-gray-800 dark:text-gray-200">
              Value
            </Label>
            <Input
              id="value"
              type="number"
              value={inputValue || ""}
              placeholder="Enter value"
              onChange={handleInputChange}
              className="w-full mt-1 text-gray-900 dark:text-gray-200"
            />
          </div>
          <Button
            type="button"
            onClick={convertValue}
            className="w-full mt-4 bg-primary text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
            Convert
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2 mt-6">
          <div className="text-3xl font-semibold text-gray-900 dark:text-white">
            {convertedValue !== null ? convertedValue.toFixed(2) : "0"}
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            {outputUnit ? outputUnit : "Unit"}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
