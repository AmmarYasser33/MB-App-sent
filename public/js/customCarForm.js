function customEditForm(
  manufacturer,
  model,
  year,
  plateletter,
  platenumber,
  mb,
  status,
  comment
) {
  return `
  <div class="col-12 col-md-6">
    <label class="form-label">Manufacturer:</label>
    <select class="form-control dt-input" id="editManufacturer" value="${manufacturer}" placeholder="Choose Manufacturer">
      <option value=""></option>
      <option ${
        manufacturer === "Toyota" ? "selected='selected'" : ""
      } value="Toyota">Toyota</option>
      <option ${
        manufacturer === "Isuzu" ? "selected='selected'" : ""
      } value="Isuzu">Isuzu</option>
      <option ${
        manufacturer === "Nissan" ? "selected='selected'" : ""
      } value="Nissan">Nissan</option>
    </select>
  </div>
  <div class="col-12 col-md-6">
    <label class="form-label">Model:</label>
    <select class="form-control dt-input" id="editModel" value="${model}" placeholder="Choose Model">
      <option value=""></option>
      <option ${
        model === "Parado" ? "selected='selected'" : ""
      } value="Parado">Parado</option>
      <option ${
        model === "Fortuner" ? "selected='selected'" : ""
      } value="Fortuner">Fortuner</option>
      <option ${
        model === "Hilux" ? "selected='selected'" : ""
      } value="Hilux">Hilux</option>
      <option ${
        model === "Shas" ? "selected='selected'" : ""
      } value="Shas">Shas</option>
      <option ${
        model === "DMax" ? "selected='selected'" : ""
      } value="DMax">DMax</option>
    </select>
  </div>
  <div class="col-12">
    <label class="form-label" for="Year">Year</label>
    <input class="form-control" id="editYear" type="number" name="Year" value="${year}" placeholder="2023"/>
  </div>
  <div class="col-12 col-md-6 fv-plugins-icon-container">
    <label class="form-label" for="editPlateLetters">Plate Letters</label>
    <input class="form-control" id="editPlateLetters" type="text" name="PlateLetters" value="${plateletter}" maxlength="3" placeholder="ABC" disabled="disabled"/>
  </div>
  <div class="col-12 col-md-6 fv-plugins-icon-container">
    <label class="form-label" for="editPlateNumbers">Plate Numbers</label>
    <input class="form-control" id="editPlateNumbers" type="number" name="PlateNumbers" value="${platenumber}" placeholder="0001" disabled="disabled"/>
  </div>
  <div class="col-12 col-md-6">
    <label class="form-label" for="editMB">MB</label>
    <select class="form-select" id="editMB" name="MB" value="${mb}" aria-label="Default select example">
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
  <div class="col-12 col-md-6">
    <label class="form-label" for="editStatus">Status</label>
    <select class="form-select" id="editStatus" name="Status" aria-label="Default select example">
      <option value=""></option>
      <option ${
        status.toLowerCase() === "clear" ? "selected='selected'" : ""
      } value="Clear">Clear</option>
      <option ${
        status === "Spare Tire" ? "selected='selected'" : ""
      } value="Spare Tire">Spare Tire</option>
      <option ${
        status === "Need Maintenance" ? "selected='selected'" : ""
      } value="Need Maintenance">Need Maintenance</option>
      <option ${
        status === "Fuel" ? "selected='selected'" : ""
      } value="Fuel">Fuel</option>
      <option ${
        status === "Outdated" ? "selected='selected'" : ""
      } value="Outdated">Outdated</option>
    </select>
  </div>
  <div class="col-12 mb-4">
    <label class="form-label" for="Name">Remarks</label>
    <textarea class="editComment form-control" id="autosize-demo" rows="3" spellcheck="false">${comment}</textarea>
  </div>
  <div class="col-12 text-center">
    <button class="btn btn-primary me-sm-3 me-1 waves-effect waves-light" id="btnSave" type="submit">Save</button>
    <button class="btn btn-label-secondary waves-effect" type="reset" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
  </div>
  <input type="hidden"/>
  `;
}

// export functions from this module
export { customEditForm };
