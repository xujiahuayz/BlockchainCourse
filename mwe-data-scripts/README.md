# How to run scripts in this directory

- Open the terminal

- Create a python virtual environment

  - iOS
    
  ```zsh
  python3 -m venv venv
  ```

  - Windows
    
  ```
  python -m venv venv
  ```

- Activate the virtual environment

  - iOS
  
  ```zsh
  . venv/bin/activate
  ```
  
  - Windows (in Command Prompt, NOT Powershell)
  
  ```zsh
  venv\Scripts\activate.bat
  ```


- `pip` install required libraries, e.g.

    ```zsh
    pip install requests
    ```

- If applicable, agree to install `ipykernel`
