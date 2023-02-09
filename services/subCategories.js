const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getsubCategories(catId){
  const rows = await db.query(
    `SELECT * FROM subcategory WHERE categoryId = '${catId}' AND delflag = 'N'`
  );
  const data = helper.emptyOrRows(rows);


  if (!rows) 
	{
	   let status = 500;
  	   let message = 'No Data Found';
	}
	else
	{
		status = 200;
  	    message = 'Data fetched Successfully';
	}
	
  return {
  	status,
  	message,
    data
  }
}




module.exports = {
  getsubCategories
}