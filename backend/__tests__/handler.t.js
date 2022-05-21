
import request from 'supertest';
import express from 'express';
import router from "../controller/foodfacilityController";
const app = new express();
app.use('/', router);

describe('Good Home Routes', function () {
    // test('responds to /', async () => {
    //     const res = await request(app).get('/foodfacility/list');
    //     expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    //     expect(res.statusCode).toBe(200);
    //     expect(res.text).toEqual('hello world!');
    // });
    // "fullname": "dfghjk",
    // "address" :"han noi",
    // "phone_number":"129321",
    // "business_type":["an uong ","kinh doanh"],
    // "certification_number":"092126"
    const query1=[{
            "fullname": "8",
            "address" :"han noi",
            "phone_number":"129321",
            "business_type":["kinh doanh"],
            "certification_number":"092126",
            "appliances" :"dat yeu cau",
            "water_source": "dat yeu cau",
            "ingredients" :"dat yeu cau",
            "food_preservation": "dat yeu cau"
},{
    "fullname": "10",
    "address" :"han noi",
    "phone_number":"129321",
    "business_type":["kinh doanh"],
    "certification_number":"092126",
    "appliances" :"dat yeu cau",
    "water_source": "dat yeu cau",
    "ingredients" :"dat yeu cau",
    "food_preservation": "dat yeu cau"
},{
    "fullname": "9",
    "address" :"hai phong",
    "phone_number":"129321",
    "business_type":["kinh doanh"],
    "certification_number":"092126",
    "appliances" :"dat yeu cau",
    "water_source": "dat yeu cau",
    "ingredients" :"dat yeu cau",
    "food_preservation": "dat yeu cau"
}]
    const query = {
        "fullname": "dfghjk",
        "address" :"han noi",
        "phone_number":"129321",
        "business_type":["an uong ","kinh doanh"],
        "certification_number":"092126"
        
        
        
      }
  test('responds to /', async () => {
    const res = await request(app).post('/foodfacility').send({ query });

    //expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    //expect(res.statusCode).toBe(200);
    //console.log(res.body);
    expect(res.body).toEqual({
        "fullname": "dfghjk",
        "address": {
            "street": "han noi",
            "_id": "6284b6c6c2f09be64f6ae05f"
        },
        "phone_number": "129321",
        "business_type": [
            "an uong ",
            "kinh doanh"
        ],
        "certification": "6284b6c6c2f09be64f6ae05d",
        "_id": "6284b6c6c2f09be64f6ae05e",
        "createdAt": "2022-05-18T09:05:10.562Z",
        "updatedAt": "2022-05-18T09:05:10.562Z",
        "__v": 0
    });
  });
  


});