const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getvendors(){
  const rows = await db.query(
    `SELECT * FROM vendors WHERE  delflag = 'N'`
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

async function getvendorrfps(vendorId){
  const rows = await db.query(
    `SELECT RfpTID AS rfpId,vendor,VNID AS vendorId, company,category, subcategory, releaseDate, closureDate, document, quantity, bidDate, rfpCost, rfpStatus, details,  participationStatus, notParticipationReason FROM ( SELECT * FROM ( SELECT * FROM ( SELECT * FROM ( SELECT * FROM rfpvendors WHERE vendorId = '${vendorId}' ) RFPVENDOR INNER JOIN( SELECT id AS VNID, vendor, company FROM vendors WHERE delflag = 'N' ) VENDORS ON RFPVENDOR.vendorId = VENDORS.VNID ) VNDRRFP INNER JOIN( SELECT id AS rID, rfpId AS RfpTID, categories, subcategories, releaseDate, closureDate, document, quantity, bidDate, rfpCost, rfpStatus, details FROM rfp ) RFP ON VNDRRFP.rfpId = RFP.rID ) RFPDETAILS INNER JOIN( SELECT id AS CATID, category FROM category ) CATEGORIES ON RFPDETAILS.categories = CATEGORIES.CATID ) RFPCATS INNER JOIN( SELECT id AS SUBCATID, subcategory FROM subcategory ) SUBCATS ON RFPCATS.subcategories = SUBCATS.SUBCATID`
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

async function getvendorrfpsById(vendorId,rfpId){
  const rows = await db.query(
    `SELECT RfpTID AS rfpId,vendor,VNID AS vendorId, company,category, subcategory, releaseDate, closureDate, document, quantity, bidDate, rfpCost, rfpStatus, details,  participationStatus, notParticipationReason FROM ( SELECT * FROM ( SELECT * FROM ( SELECT * FROM ( SELECT * FROM rfpvendors WHERE vendorId = '${vendorId}' ) RFPVENDOR INNER JOIN( SELECT id AS VNID, vendor, company FROM vendors WHERE delflag = 'N' ) VENDORS ON RFPVENDOR.vendorId = VENDORS.VNID ) VNDRRFP RIGHT OUTER JOIN( SELECT id AS rID, rfpId AS RfpTID, categories, subcategories, releaseDate, closureDate, document, quantity, bidDate, rfpCost, rfpStatus, details FROM rfp WHERE rfpId = '${rfpId}' ) RFP ON VNDRRFP.rfpId = RFP.rID ) RFPDETAILS INNER JOIN( SELECT id AS CATID, category FROM category ) CATEGORIES ON RFPDETAILS.categories = CATEGORIES.CATID ) RFPCATS INNER JOIN( SELECT id AS SUBCATID, subcategory FROM subcategory ) SUBCATS ON RFPCATS.subcategories = SUBCATS.SUBCATID`
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
  getvendors,
  getvendorrfps,
  getvendorrfpsById
}