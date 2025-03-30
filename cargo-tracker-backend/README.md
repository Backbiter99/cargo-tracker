## Backend Setup Instructions

### 1. Navigate to the Backend Directory

```sh
cd cargo-tracker-backend
```

### 2. Install Dependencies

```sh
pnpm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following variable:

```ini
MONGODB_URL=mongodb+srv://<username>:<password>@<cluster-url>
```

**Notes:**

-   Replace `<username>`, `<password>`, and `<cluster-url>` with your actual MongoDB credentials.
-   The `MONGODB_URL` variable should be in the format:
    ```
    mongodb+srv://<username>:<password>@<cluster-url>
    ```
-   Do **not** include the database name in the `MONGODB_URL` variable.

### 4. Run the Development Server

```sh
pnpm run dev
```

The development server will start at `http://localhost:3000`.
