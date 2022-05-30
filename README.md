### Preconditions

1. Account on dietly.pl web page with:  
    a) delivery address already set  
    b) active catering already set (I was testing on Kuchnia Vikinga from Gdańsk)
2. Nodejs 16.15.0 LTS installed.


### Installation
1. Go to the project directory in cmd/terminal/PowerShell:  
``cd /path/to/project/directory``  
2. Run command:  
``npm install``
3. In ``cypress.json`` write down your credentials to dietly account. Options ``env.email`` and ``env.password``.

### Launch
There are three options predefined in ``package.json``.  
1. Run in headless mode:  
``npm run cypress:run``  
2. Run in headed mode:  
``npm run cypress:runh``
3. Opens the Cypress Test Runner:  
``npm run cypress:open``

### Troubleshooting
1. Sometimes there is a problem with opening the Panel after logging in. Re-run then.  
2. One modal was not handled (lack of time).

![Not handled modal](./modal.png)