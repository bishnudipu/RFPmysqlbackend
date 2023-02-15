const db = require("./db");
const helper = require("../helper");
const config = require("../config");
/*const multer = require('multer');
const upload = multer({ dest: "uploads/" });
var storage = multer.diskStorage({   
 destination: function(req, file, cb) { 
      cb(null, './uploads');    
   }, 
 filename: function (req, file, cb) { 
      cb(null , file.originalname);   
   }
});*/

async function getrfps(/*page = 1*/) {
  /*const offset = helper.getOffset(page, config.listPerPage);*/
  var getrfpquery = `SELECT id, rfpId, category, subcategory, releaseDate, closureDate, document, quantity, bidDate, rfpCost, rfpStatus, details FROM ( SELECT * FROM ( SELECT * FROM rfp WHERE delflag = 'N' ) RFP INNER JOIN( SELECT id AS CATID, category FROM category )CATEGORIES ON RFP.categories = CATEGORIES.CATID )RFPCATS INNER JOIN( SELECT id AS SUBCATID, subcategory FROM subcategory )SUBCATS ON RFPCATS.subcategories = SUBCATS.SUBCATID`;

  /*var getrfpquery = `SELECT id, rfpId, vendor, VID AS vendorId, company, category, subcategory, releaseDate, closureDate, document, quantity, bidDate, rfpCost, rfpStatus, details FROM ( SELECT * FROM ( SELECT * FROM ( SELECT * FROM ( SELECT * FROM rfp WHERE delflag = 'N' ) RFP INNER JOIN( SELECT id AS CATID, category FROM category ) CATEGORIES ON RFP.categories = CATEGORIES.CATID ) RFPCATS INNER JOIN( SELECT id AS SUBCATID, subcategory FROM subcategory ) SUBCATS ON RFPCATS.subcategories = SUBCATS.SUBCATID ) RFPDETAILS INNER JOIN( SELECT vendorId, rfpId AS RID, participationStatus, notParticipationReason FROM rfpvendors ) RFPVENDORS ON RFPDETAILS.id = RFPVENDORS.RID ) RVENDORS INNER JOIN( SELECT vendor, id AS VID, company FROM vendors ) VENDORDETAILS ON RVENDORS.vendorId = VENDORDETAILS.VID`;*/

  const rows = await db.query(
    getrfpquery
    /*`SELECT * FROM rfp LIMIT ${offset},${config.listPerPage}`*/
  );

  var data = helper.emptyOrRows(rows);
  /* const meta = {page};*/
  if (!rows) {
    let status = 500;
    let message = "No Data Found";
  } else {
    var i = 0;
    var dataarr = [];

    for (i = 0; i < data.length; i++) {
      var rfpVendors = `SELECT vendor,VNID AS vendorId, company FROM ( SELECT * FROM ( SELECT * FROM ( SELECT * FROM ( SELECT * FROM rfpvendors WHERE rfpId = '${data[i].id}' ) RFPVENDOR INNER JOIN( SELECT id AS VNID, vendor, company FROM vendors WHERE delflag = 'N' ) VENDORS ON RFPVENDOR.vendorId = VENDORS.VNID ) VNDRRFP INNER JOIN( SELECT id AS rID, rfpId AS RfpTID, categories, subcategories, releaseDate, closureDate, document, quantity, bidDate, rfpCost, rfpStatus, details FROM rfp ) RFP ON VNDRRFP.rfpId = RFP.rID ) RFPDETAILS INNER JOIN( SELECT id AS CATID, category FROM category ) CATEGORIES ON RFPDETAILS.categories = CATEGORIES.CATID ) RFPCATS INNER JOIN( SELECT id AS SUBCATID, subcategory FROM subcategory ) SUBCATS ON RFPCATS.subcategories = SUBCATS.SUBCATID`;
      const vendorrows = await db.query(rfpVendors);
      const vendorrowsdata = helper.emptyOrRows(vendorrows);

      data[i].vendors = vendorrowsdata;
    }

    status = 200;
    message = "Data fetched Successfully";
  }

  return {
    status,
    message,
    data,
  };
}

async function getrfpvendors(rfpid) {
  /*const offset = helper.getOffset(page, config.listPerPage);*/
  var getrfpquery = `SELECT RfpTID AS rfpId,vendor,VNID AS vendorId, company,category, subcategory, releaseDate, closureDate, document, quantity, bidDate, rfpCost, rfpStatus, details,  participationStatus, notParticipationReason FROM ( SELECT * FROM ( SELECT * FROM ( SELECT * FROM ( SELECT * FROM rfpvendors WHERE rfpId = '${rfpid}' ) RFPVENDOR INNER JOIN( SELECT id AS VNID, vendor, company FROM vendors WHERE delflag = 'N' ) VENDORS ON RFPVENDOR.vendorId = VENDORS.VNID ) VNDRRFP INNER JOIN( SELECT id AS rID, rfpId AS RfpTID, categories, subcategories, releaseDate, closureDate, document, quantity, bidDate, rfpCost, rfpStatus, details FROM rfp ) RFP ON VNDRRFP.rfpId = RFP.rID ) RFPDETAILS INNER JOIN( SELECT id AS CATID, category FROM category ) CATEGORIES ON RFPDETAILS.categories = CATEGORIES.CATID ) RFPCATS INNER JOIN( SELECT id AS SUBCATID, subcategory FROM subcategory ) SUBCATS ON RFPCATS.subcategories = SUBCATS.SUBCATID`;

  const rows = await db.query(
    getrfpquery
    /*`SELECT * FROM rfp LIMIT ${offset},${config.listPerPage}`*/
  );
  const data = helper.emptyOrRows(rows);
  /* const meta = {page};*/
  if (!rows) {
    let status = 500;
    let message = "No Data Found";
  } else {
    status = 200;
    message = "Data fetched Successfully";
  }

  return {
    status,
    message,
    data,
  };
}

async function getRfpById(rfpid) {
  /*const offset = helper.getOffset(page, config.listPerPage);*/
  /*var getrfpquery = `SELECT id, rfpId, category, subcategory, releaseDate, closureDate, document, quantity, bidDate, rfpCost, rfpStatus, details FROM ( SELECT * FROM ( SELECT * FROM rfp WHERE delflag = 'N' ) RFP INNER JOIN( SELECT id AS CATID, category FROM category )CATEGORIES ON RFP.categories = CATEGORIES.CATID )RFPCATS INNER JOIN( SELECT id AS SUBCATID, subcategory FROM subcategory )SUBCATS ON RFPCATS.subcategories = SUBCATS.SUBCATID`;*/
  var getrfpquery = `SELECT id, rfpId,  category, subcategory, releaseDate, closureDate, document, quantity, bidDate, rfpCost, rfpStatus, details FROM ( SELECT * FROM ( SELECT * FROM rfp WHERE delflag = 'N' AND id = '${rfpid}' ) RFP INNER JOIN( SELECT id AS CATID, category FROM category ) CATEGORIES ON RFP.categories = CATEGORIES.CATID ) RFPCATS INNER JOIN( SELECT id AS SUBCATID, subcategory FROM subcategory ) SUBCATS ON RFPCATS.subcategories = SUBCATS.SUBCATID `;

  const rows = await db.query(
    getrfpquery
    /*`SELECT * FROM rfp LIMIT ${offset},${config.listPerPage}`*/
  );
  const data = helper.emptyOrRows(rows);
  /* const meta = {page};*/
  if (!rows) {
    let status = 500;
    let message = "No Data Found";
  } else {
    status = 200;
    message = "Data fetched Successfully";
  }

  return {
    status,
    message,
    data,
  };
}

async function createrfps(rfpDetails) {
  var createRfp = `INSERT INTO rfp 
    (rfpId, categories, subcategories, releaseDate, closureDate,document,quantity,bidDate,rfpCost,rfpStatus,details,created,modified,delflag) 
    VALUES 
    ('${rfpDetails.body.rfpId}', '${rfpDetails.body.category}', '${rfpDetails.body.subcategory}','${rfpDetails.body.releaseDate}','${rfpDetails.body.closureDate}','','${rfpDetails.body.quantity}','${rfpDetails.body.releaseDate}','${rfpDetails.body.rfpCost}','0','${rfpDetails.body.details}',NOW(),NOW(),'N' )`;

  const result = await db.query(createRfp);

  lastid = result.insertId;
  console.log(rfpDetails);
  var vendors = rfpDetails.body.vendors.split(",");
  vendors.forEach((element) => {
    db.query(
      `INSERT INTO rfpvendors (vendorId, rfpId, participationStatus, notParticipationReason, created, delflag)  VALUES ('${element}', '${lastid}','1', '',NOW(),'N' )`
    );
  });
  let status = 500;
  let message = "Rfp Creation Unsuccessful";
  if (result.affectedRows) {
    status = 200;
    message = "Rfp Created Successsfully";
  }

  return { status, message };
}

async function createbids(bidDetails) {
  let getrfpquery = `SELECT id, rfpId,  category, subcategory, releaseDate, closureDate, document, quantity, bidDate, rfpCost, rfpStatus, details FROM ( SELECT * FROM ( SELECT * FROM rfp WHERE delflag = 'N' AND id = '${bidDetails.body.rfpId}' ) RFP INNER JOIN( SELECT id AS CATID, category FROM category ) CATEGORIES ON RFP.categories = CATEGORIES.CATID ) RFPCATS INNER JOIN( SELECT id AS SUBCATID, subcategory FROM subcategory ) SUBCATS ON RFPCATS.subcategories = SUBCATS.SUBCATID `;

  const rows = await db.query(getrfpquery);
  const data = helper.emptyOrRows(rows);

  let createbid = `INSERT INTO vendor_bids (vendorId, rfpId, bidPrice, descrption,created,delflag) VALUES ('${bidDetails.body.vendorId}', '${bidDetails.body.rfpId}', '${bidDetails.body.bidPrice}','${bidDetails.body.descrption}',NOW(),'N' )`;
  const result = await db.query(createbid);
  lastid = result.insertId;
  let status = 500;
  let bidId = "";
  let message = "Bid Placed Unsuccessful";
  if (result.affectedRows) {
    status = 200;
    bidId = lastid;
    message = "Bid Placed Successfully for Rfp# " + rows[0].rfpId;
  }
  return { status, bidId, message };
}

async function getrfpBids(req) {
  var getrfpquery = `SELECT vendorId,vendor,RRID AS rfpId,bidPrice,quantity,descrption,created FROM ( SELECT * FROM ( SELECT * FROM vendor_bids WHERE rfpId = '${req.body.rfpId}')VENDORBIDS INNER JOIN (SELECT id AS VID,vendor,company FROM vendors )VENDORS ON VENDORBIDS.vendorId = VENDORS.VID)VENDORBIDDETAILS INNER JOIN ( SELECT rfpId AS RRID,id AS RID,quantity FROM rfp)RFPDETAILS ON VENDORBIDDETAILS.rfpId = RFPDETAILS.RID;`;

  const rows = await db.query(getrfpquery);
  const data = helper.emptyOrRows(rows);
  if (!rows) {
    let status = 500;
    let message = "No Data Found";
  } else {
    status = 200;
    message = "Data fetched Successfully";
  }

  return {
    status,
    message,
    data,
  };
}

module.exports = {
  getrfps,
  createrfps,
  getrfpvendors,
  getRfpById,
  createbids,
  getrfpBids,
};
