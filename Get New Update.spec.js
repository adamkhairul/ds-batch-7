const { test, expect } = require("@playwright/test");
const { Ajv } = require("ajv");

const ajv= new Ajv()

test('TC-1 GET Objects', async ({ request }) => {

    const response = await request.get('https://api/users/2');
    expect(response.status()).toBe(200)

    const responseData = await response.json()

    expect(responseData.id).toBe("7")
    expect(responseData.email).toBe("janet.weaver@reqres.in")
    expect(responseData.first_name).toBe("Janet")
    expect(responseData.last_name).toBe("Weaver")
    expect(responseData.avatar).toBe("https://reqres.in/img/faces/2-image.jpg")

    const valid = ajv.validate(require('./jsonschema/get-object-schema.json'), responseData)

    if (!valid){
        console.log("AJV Validation Errors:", ajv.errorsText());
    }

    expect(valid).toBe(true);
});

test('TC-2 POST Objects', async ({ request }) => {

    const bodyData = {    
        "name": "morpheus",
        "job": "leader"
    }
    
    const headerData = {
        Accept: 'application/json'
    }

    const response = await request.post('https://api/users/', {
        headers: headerData,
        data: bodyData
    });

    console.log(response.status());
    console.log(await response.json());
    
});

test('TC-3 PUT Objects', async ({ request }) => {

    const bodyData = {    
        "name": "morpheus",
        "job": "zion resident"
    }
    
    const headerData = {
        Accept: 'application/json'
    }

    const response = await request.put('https://api/users/2', {
        headers: headerData,
        data: bodyData
    });

    console.log(response.status());
    console.log(await response.json());
    
});

