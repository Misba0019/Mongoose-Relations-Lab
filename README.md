# 🧬 Mongoose Relations Lab

**A backend-focused project demonstrating core MongoDB relationship patterns using Mongoose.**  
This lab explores real-world data modeling techniques, including referenced relationships and embedded documents, using `.populate()` to simulate joins in MongoDB.

> There is no frontend or Express app — this is strictly backend and data modeling focused.

---

## Key Concepts Demonstrated

- **One-to-many relationships** using ObjectId references (e.g., Farm ➝ Products)
- **Many-to-one relationships** (e.g., Tweet ➝ User)
- **Embedded subdocuments** for nested arrays (e.g., User ➝ Addresses)
- Use of `.populate()` for fetching related data

> All code is beginner-friendly, uses clearly named async functions, and follows a consistent `runDemo()` pattern to toggle logic.

---

## Technologies Used

- Node.js
- MongoDB
- Mongoose

---

## Getting Started

### 1. Install Dependencies
```bash
npm install mongoose
```

### 2. Start MongoDB
Ensure your local MongoDB server is running:
```bash
mongod
```

### 3. Run Example Scripts
Run one of the files to test the relationship examples:
```bash
node models/farm.js
node models/tweet.js
node models/user.js
```

Inside each file, use the runDemo() function to toggle what you want to test.

---

## Example Usage

Inside each file, a `runDemo()` function is defined. You can comment/uncomment specific demo functions to control what runs:
```bash
const runDemo = async () => {
  // await makeFarm(); // Creates a farm
  // await addProduct(); // Adds product to the farm
  await showPopulatedFarm(); // Displays farm with populated products
}
```
Only run what you need — this helps avoid duplicate entries or redundant data in your MongoDB collections.

---

## Tip
To explore your MongoDB data visually, you can use tools like mongosh (CLI shell) or MongoDB Compass (GUI viewer).  
While this project runs entirely in the terminal, these tools are useful for inspecting your collections during development.

---

## Code Highlights

### `farm.js`
- References `Product` documents inside `Farm` using ObjectId array
- Demonstrates adding and populating related data
- Uses `.populate('products')` to pull full product data

### `tweet.js`
- Each `Tweet` references a `User`
- `.populate('user')` is used to simulate a join
- Demonstrates how to associate a document with another using references

### `user.js`
- Embeds multiple `addresses` directly inside the `User` document
- Shows how to push new **subdocuments** to an embedded array
- Uses `_id: false` to avoid Mongoose adding subdocument IDs

---

## Feedback
If you find this project helpful, consider starring the repo to support my learning journey!

---

## License
This project is licensed under the [MIT License](LICENSE).
