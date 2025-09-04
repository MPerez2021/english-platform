**Objective:** Design a **minimalist English learning platform** with dynamic pages that adapt based on user-selected topics (Vocabulary, Grammar, Reading, Writing) and a responsive left sidebar for navigation.

## **Dynamic Page Behavior:**

* The page must be dynamic since each page is related with the topic that the user wants to see. For instance, the user chooses Vocabulary then the page must show all content related with that topic, which is organized on the left sidebar. Similarly with Grammar, Writing and so on.
* The left sidebar would be dynamic as well since the content is created with the chosen topic.
* When the user clicks a category, it should expand (collapsible) to show the subcategories. Then when the user clicks the subcategory the content must be shown on the right side.
* Use hardcoded values for now.
* For the sidebar use the sidebar Shadcn component.
* Only use the global.css styles with tailwind. You are not allowed to create custom CSS.

## **Layout Instructions:**

### **Left Sidebar (Dynamic)**

* **Dynamic Filters based on selected topic:**

  **For Vocabulary:**
  * **Level (A1–C2)**.
  * **Categories (expandable)**:
    * Everyday Life → (Food, Travel, Shopping).
    * Academic → (Science, History, Literature).
    * Business → (Meetings, Negotiations, Emails).

  **For Grammar:**
  * **Level (A1–C2)**.
  * **Categories (expandable)**:
    * Basics → (Articles, Pronouns, Prepositions).
    * Verb Forms → (Present, Past, Future, Conditionals).
    * Advanced → (Subjunctive, Passive Voice, Reported Speech).

  **For Reading:**
  * **Level (A1–C2)**.
  * **Categories (expandable)**:
    * Fiction → (Short Stories, Novels, Poetry).
    * Non-Fiction → (News, Articles, Essays).
    * Academic → (Research Papers, Textbooks, Reports).

  **For Writing:**
  * **Level (A1–C2)**.
  * **Categories (expandable)**:
    * Creative → (Stories, Poems, Scripts).
    * Academic → (Essays, Reports, Thesis).
    * Professional → (Emails, Letters, Proposals).

### **Main Content (Right Side)**

* **Dynamic content area** that updates based on sidebar selections.
* Responsive grid of **cards**
* Each card must include:
  * Title (e.g., *"Food Vocabulary"*, *"Present Tense Grammar"*, *"Short Story Reading"*, *"Email Writing"*).
  * Short description (1–2 sentences).
  * Create the space where the image is being shown.
* Cards have soft shadows, rounded corners, hover scale-up.

### **Top Banner (Dynamic)**

* **Dynamic Title** based on selected topic:
  * "Vocabulary" → *"Expand your vocabulary step by step."*
  * "Grammar" → *"Master English grammar rules and structures."*
  * "Reading" → *"Improve your reading comprehension and speed."*
  * "Writing" → *"Develop your written communication skills."*

## **Technical Requirements:**

* Use Shadcn sidebar component for the left navigation.
* Only use global.css styles with Tailwind CSS.
* No custom CSS allowed.
* Implement with hardcoded values for now.
