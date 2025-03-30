# Cargo Tracker - Installation Guide

## Live Link : https://cargo-tracker-eosin.vercel.app/

## Clone the Repository

```sh
git clone https://github.com/Backbiter99/cargo-tracker.git
cd cargo-tracker
```

## Running the Frontend Locally

1. Navigate to the frontend directory:
    ```sh
    cd cargo-tracker-frontend
    ```
2. Install dependencies:
    ```sh
    pnpm install
    ```
3. Start the development server:
    ```sh
    pnpm run dev
    ```
4. The frontend will be available at:
   **[http://localhost:5173](http://localhost:5173)**

---

## Running the Backend Locally

1. Navigate to the backend directory:
    ```sh
    cd cargo-tracker-backend
    ```
2. Install dependencies:
    ```sh
    pnpm install
    ```
3. Create a `.env` file in the root directory and add the following environment variable:

    ```sh
    MONGODB_URL=mongodb+srv://<username>:<password>@<cluster-url>
    ```

    **Notes:**

    - Replace `<username>`, `<password>`, and `<cluster-url>` with your actual MongoDB credentials.
    - The `MONGODB_URL` variable should follow this format:
        ```
        mongodb+srv://<username>:<password>@<cluster-url>
        ```
    - **Do not** include the database name in the `MONGODB_URL` variable.

4. Start the backend server:
    ```sh
    pnpm run dev
    ```
5. The backend will be available at:
   **[http://localhost:3000](http://localhost:3000)**
