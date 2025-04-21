# Flask API Project

This project is a simple Flask API that collects user information including name, address, and phone number.

## Project Structure

```
flask-api-project
├── app
│   ├── __init__.py
│   ├── routes.py
│   └── models.py
├── requirements.txt
├── config.py
└── README.md
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd flask-api-project
   ```

2. **Create a virtual environment:**
   ```
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```
     source venv/bin/activate
     ```

4. **Install the required dependencies:**
   ```
   pip install -r requirements.txt
   ```

5. **Run the application:**
   ```
   python -m flask run
   ```

## API Usage

### Endpoint

- **POST /api/userinfo**

#### Request Body

```json
{
  "name": "John Doe",
  "address": "123 Main St, Anytown, USA",
  "phone_number": "123-456-7890"
}
```

#### Response

- **Success (201 Created)**: Returns the created user information.
- **Error (400 Bad Request)**: Returns an error message if the input data is invalid.

## License

This project is licensed under the MIT License.