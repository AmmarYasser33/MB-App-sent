function customEditForm(
  serialnumber,
  partnumber,
  name,
  receiver,
  from,
  deliverymethod,
  status,
  date,
  rack,
  comment
) {
  return `
  <div class="col-12 col-md-6">
    <label class="form-label" for="addSerialNumber">Serial Number</label>
    <input class="form-control" id="editSerialNumber" type="text" value="${serialnumber}" name="SerialNumber" placeholder="Serial Number" disabled="disabled"/>
  </div>
  <div class="col-12 col-md-6">
    <label class="form-label" for="addPartNumber">Part Number</label>
    <input class="form-control" id="editPartNumber" type="text" value="${partnumber}" name="PartNumber" placeholder="Part Number"/>
  </div>
  <div class="col-12">
    <label class="form-label" for="addName">Name</label>
    <input class="form-control" id="editName" type="text" value="${name}" name="Name" placeholder="Analog Board"/>
  </div>
  <div class="col-12 col-md-6 fv-plugins-icon-container">
    <label class="form-label" for="addReciever">Recieved By</label>
    <input class="form-control" id="editReciever" type="text" value="${receiver}" name="Reciever" placeholder="Recieved By"/>
  </div>
  <div class="col-12 col-md-6">
    <label class="form-label" for="addFrom">From</label>
    <input class="form-control" id="editFrom" type="text" value="${from}" name="From" placeholder="Part Number"/>
  </div>
  <div class="col-12 col-md-6">
    <label class="form-label" for="addDeliveryMethod">Delivery Method</label>
    <select class="form-select" id="editDeliveryMethod" name="DeliveryMethod" aria-label="Default select example">
      <option value=""></option>
      <option ${
        deliverymethod === "Internal Driver" ? "selected='selected'" : ""
      } value="Internal Driver">Internal Driver</option>
      <option ${
        deliverymethod === "DHL" ? "selected='selected'" : ""
      } value="DHL">DHL</option>
      <option ${
        deliverymethod === "SPL" ? "selected='selected'" : ""
      } value="SPL">SPL</option>
      <option ${
        deliverymethod === "Other" ? "selected='selected'" : ""
      } value="Other">Other</option>
    </select>
  </div>
  <div class="col-12 col-md-6">
    <label class="form-label" for="addStatus">Status</label>
    <select class="form-select" id="editStatus" name="Status" aria-label="Default select example">
      <option value=""></option>
      <option ${
        status === "In Warehouse" ? "selected='selected'" : ""
      } value="In Warehouse">In Warehouse</option>
      <option ${
        status === "Installed" ? "selected='selected'" : ""
      } value="Installed">Installed</option>
      <option ${
        status === "Sent" ? "selected='selected'" : ""
      } value="Sent">Sent</option>
      <option ${
        status === "Returned" ? "selected='selected'" : ""
      } value="Returned">Returned</option>
    </select>
  </div>
  <div class="col-12 col-md-6">
    <label class="form-label" for="addmodalEditDate">Recieving Date</label>
    <input class="form-control dt-input dt-full-name" id="editmodalEditDate" type="date" value="${date}" name="modalEditDate"/>
  </div>
  <div class="col-12 col-md-6">
    <label class="form-label" for="addTypeaheadBasic">Rack</label>
    <input class="form-control typeahead" id="editTypeaheadBasic" value="${rack}" type="text" autocomplete="off" placeholder="Rack Number"/>
  </div>
  <div class="col-12 mb-4">
    <label class="form-label" for="Name">Comments</label>
    <textarea class="form-control editComment" id="autosize-demo" rows="3" spellcheck="false">${comment}</textarea>
  </div>
  <div class="col-12 text-center">
    <button class="btn btn-primary me-sm-3 me-1 waves-effect waves-light" type="submit" id="btnSave">Save</button>
    <button class="btn btn-label-secondary waves-effect" type="reset" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
  </div>
  <input type="hidden"/>
`;
}

// export functions from this module
export { customEditForm };
