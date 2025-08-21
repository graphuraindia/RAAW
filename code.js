function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  var timestamp = new Date();
  var resumeLink = "";

  // ✅ Resume upload to Drive
  if (data.resume && data.resumeName) {
    var folderId = "1GH70IlegEMQVjhS2Cm118uGgTZZxOQ6w"; // Your Drive Folder ID
    var folder = DriveApp.getFolderById(folderId);

    var contentType = "application/pdf";
    var decoded = Utilities.base64Decode(data.resume);
    var blob = Utilities.newBlob(decoded, contentType, data.resumeName);

    var file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    resumeLink = file.getUrl();
  }

  // ✅ Save to Google Sheet
  sheet.appendRow([
    timestamp,
    data.name,
    data.mobile,
    data.email,
    data.dob,
    data.gender,
    data.state,
    data.city,
    data.street,
    data.pincode,
    data.college,
    data.course,
    data.education,
    data.position,
    data.domain,
    data.duration,
    data.contact,
    data.tpoName,
    data.tpoContact,
    data.tpoEmail,
    data.experience,
    resumeLink
  ]);

  return ContentService.createTextOutput(
    JSON.stringify({ "status": "success", "message": "Data saved with resume!" })
  ).setMimeType(ContentService.MimeType.JSON);
}
