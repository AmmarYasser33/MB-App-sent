function customEditForm(
  sarid,
  nationalid,
  name,
  email,
  phoneNumber,
  nationality,
  role,
  pts,
  ptsExpiringDate,
  po,
  poNumber,
  poExpiringDate,
  mb,
  comment
) {
  return `
  <div class="modal-dialog modal-lg modal-simple modal-edit-user">
  <div class="modal-content p-3 p-md-5">
    <div class="modal-body">
      <button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
      <div class="text-center mb-4">
        <h3 class="mb-2">Edit Record</h3>
        <p class="text-muted">Edit team member.</p>
      </div>
      <form class="row g-3 fv-plugins-bootstrap5 fv-plugins-framework" id="edititemForm" novalidate="novalidate" data-select2-id="edititemForm">
        <div class="col-12 col-md-6">
          <label class="form-label" for="SARID">SAR ID</label>
          <input class="form-control" id="editSARID" type="number" name="SARID" value="${sarid}" placeholder="0001" disabled="disabled"/>
        </div>
        <div class="col-12 col-md-6">
          <label class="form-label" for="NationalID">National ID</label>
          <input class="form-control" id="editNationalID" type="number" name="NationalID" value="${nationalid}" placeholder="National ID"/>
        </div>
        <div class="col-12">
          <label class="form-label" for="Name">Full Name</label>
          <input class="form-control" id="editName" type="text" name="Name" value="${name}" placeholder="Full Name"/>
        </div>
        <div class="col-12 col-md-6 fv-plugins-icon-container">
          <label class="form-label" for="Email">Email</label>
          <input class="form-control" id="editEmail" type="text" name="Email" value="${email}" placeholder="xxxxx@xxxx.com"/>
        </div>
        <div class="col-12 col-md-6">
          <label class="form-label" for="PhoneNumber">Phone Number</label>
          <input class="form-control" id="editPhoneNumber" type="text" name="PhoneNumber" value="${phoneNumber}" placeholder="5xxxxxxxx"/>
        </div>
        <div class="col-12 col-md-6">
          <label class="form-label" for="Nationality">Nationality</label>
          <select class="form-select" id="editNationality" name="Nationality" aria-label="Default select example">
            <option value=""></option>
            <option ${
              nationality === "Saudi" ? "selected='selected'" : ""
            } value="Saudi">Saudi</option>
            <option ${
              nationality === "Pakistani" ? "selected='selected'" : ""
            } value="Pakistani">Pakistani</option>
            <option ${
              nationality === "Indian" ? "selected='selected'" : ""
            } value="Indian">Indian</option>
            <option ${
              nationality === "Filipino" ? "selected='selected'" : ""
            } value="Filipino">Filipino</option>
          </select>
        </div>
        <div class="col-12 col-md-6">
          <label class="form-label" for="Role">Role</label>
          <select class="form-select" id="editRole" name="Role" aria-label="Default select example">
            <option value=""></option>
            <option ${
              role === "technician" ? "selected='selected'" : ""
            } value="technician">Technician</option>
            <option ${
              role === "senior-technician" ? "selected='selected'" : ""
            } value="senior-technician">Senior Technician</option>
            <option ${
              role === "shift-leader" ? "selected='selected'" : ""
            } value="shift-leader">Shift Leader</option>
            <option ${
              role === "assistant" ? "selected='selected'" : ""
            } value="assistant">Assistant</option>
            <option ${
              role === "team-leader" ? "selected='selected'" : ""
            } value="team-leader">Team Leader</option>
          </select>

        </div>
        <div class="col-12 col-md-6">
          <label class="form-label" for="PTS">PTS</label>
          <select class="form-select" id="editPTS" name="PTS" aria-label="Default select example">
            <option value=""></option>
            <option ${
              pts === "Active" ? "selected='selected'" : ""
            } value="Active">Active</option>
            <option ${
              pts === "Expired" ? "selected='selected'" : ""
            } value="Expired">Expired</option>
          </select>

        </div>
        <div class="col-12 col-md-6">
          <label class="form-label" for="editPTSExpiringDate">PTS Expiring Date</label>
          <input class="form-control dt-input dt-full-name" id="editPTSExpiringDate" type="date" name="editPTSExpiringDate" value="${ptsExpiringDate}"/>
        </div>
        <div class="col-12 col-md-6">
          <label class="form-label" for="PO">PO</label>
          <select class="form-select" id="editPO" name="PO" aria-label="Default select example">
            <option value=""></option>
            <option ${
              po === "Active" ? "selected='selected'" : ""
            } value="Active">Active</option>
            <option ${
              po === "Expired" ? "selected='selected'" : ""
            } value="Expired">Expired</option>
            <option ${
              po === "Not PO" ? "selected='selected'" : ""
            } value="Not PO">Not PO</option>
          </select>

        </div>
        <div class="col-12 col-md-6">
          <label class="form-label" for="PONumber">PO Number</label>
          <input class="form-control" id="editPONumber" type="number" name="PONumber" value="${poNumber}" placeholder="0001"/>
        </div>
        <div class="col-12 col-md-6">
          <label class="form-label" for="POExpiringDate">PO Expiring Date</label>
          <input class="form-control dt-input dt-full-name" id="editPOExpiringDate" type="date" name="POExpiringDate" value="${poExpiringDate}"/>
        </div>
        <div class="col-12 col-md-6">
          <label class="form-label" for="MB">MB</label>
          <select class="form-select" id="editMB" name="MB" aria-label="Default select example">
            <option value=""></option>
            <option ${
              mb === "MB1" ? "selected='selected'" : ""
            } value="MB1">MB1</option>
            <option ${
              mb === "MB2" ? "selected='selected'" : ""
            } value="MB2">MB2</option>
            <option ${
              mb === "MB3" ? "selected='selected'" : ""
            } value="MB3">MB3</option>
            <option ${
              mb === "MB4" ? "selected='selected'" : ""
            } value="MB4">MB4</option>
            <option ${
              mb === "MB5" ? "selected='selected'" : ""
            } value="MB5">MB5</option>
            <option ${
              mb === "MB6" ? "selected='selected'" : ""
            } value="MB6">MB6</option>
            <option ${
              mb === "MB7" ? "selected='selected'" : ""
            } value="MB7">MB7</option>
            <option ${
              mb === "MB8" ? "selected='selected'" : ""
            } value="MB8">MB8</option>
            <option ${
              mb === "MB9" ? "selected='selected'" : ""
            } value="MB9">MB9</option>
          </select>
        </div>
        <div class="col-12 mb-4">
          <label class="form-label" for="Name">Remarks</label>
          <textarea class="editComment form-control" id="autosize-demo" rows="3" spellcheck="false">${comment}</textarea>
        </div>
        
        <input type="hidden"/>
      </form>
      <div class="col-12 text-center">
          <button class="btn btn-primary me-sm-3 me-1 waves-effect waves-light" id="btnSave"  >Save</button>
          <button class="btn btn-label-secondary waves-effect" type="reset" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
        </div>
    </div>
  </div>
</div>
  `;
}

// export functions from this module
export { customEditForm };
