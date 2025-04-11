# Macro_Nutrient_Calculator

## Objective
This project is a web application designed to calculate daily macronutrient needs (carbohydrates, protein, and fat) based on user-provided information such as age, weight, height, gender, activity level, and fitness goals. It also includes a dark mode toggle for improved user experience and dynamically fetches and displays recipe suggestions from a remote API. The application primarily uses HTML, CSS, and JavaScript for front-end development and interaction, leveraging the DOM to manipulate content dynamically.

## Output
<iframe src="https://niat-web.github.io/Macro_Nutrient_Calculator" height="1000" width="300" title="Macro_Nutrient_Calculator"></iframe>

## Project Requirements
**Technologies:** HTML, CSS, JavaScript

## Features to Implement
- Calculation of Basal Metabolic Rate (BMR) based on user input.
- Calculation of Total Daily Energy Expenditure (TDEE) based on BMR and activity level.
- Adjustment of calorie intake based on the user's specified fitness goal (lose, gain, or maintain weight).

## UI Enhancements
- Implement a more visually appealing and responsive design.
- Improve error handling and validation feedback for user inputs.

## Project Tasks & Expected Outcomes
| Task | Expected Outcome |
|------|------------------|
| Implement form input validation | Ensure all required fields are filled before submission; display appropriate error messages. |
| Calculate macronutrient distribution | Calculate and display the recommended grams of carbohydrates, protein, and fat based on calorie intake. |
| Fetch and display a recipe | Display a recipe with ingredients and instructions fetched from a dummy API. |

## JavaScript Concepts
| Concept | Implementation |
|---------|----------------|
| DOM Manipulation | Used to access and modify HTML elements, display results, and toggle dark mode. |
| Event Listeners | Used to handle form submissions, button clicks, and dark mode toggling. |
| Asynchronous JavaScript | Used to fetch recipe data from an external API using `fetch` and `async/await`. |

## API Details
| API | Endpoint | Description |
|-----|----------|-------------|
| DummyJSON | `https://dummyjson.com/recipes` | Provides recipe data including name, cuisine, ingredients, instructions, and calories. |
| AllOrigins | `https://api.allorigins.win/raw?url=[API URL]` | Used as a proxy to avoid CORS issues when fetching recipe data directly. |

## MISC Section:

### 1. Formulas/Calculations:
- **Macronutrient Distribution:**
  - Carbohydrates: `(Calorie Intake * 0.4) / 4` (40% of calories from carbs, 4 calories per gram)
  - Protein: `(Calorie Intake * 0.3) / 4` (30% of calories from protein, 4 calories per gram)
  - Fat: `(Calorie Intake * 0.3) / 9` (30% of calories from fat, 9 calories per gram)

### 2. Array Data:
- There are no pre-defined arrays with data declared in the provided JavaScript code. However, the API (`https://dummyjson.com/recipes`) returns a JSON object containing an array of `recipes`. Each recipe object contains an array of `ingredients` and an array of `instructions`.