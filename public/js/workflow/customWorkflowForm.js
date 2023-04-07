function customEditForm(
  date,
  Employees,
  team,
  workorder,
  site,
  type,
  status,
  timein,
  timeout,
  description,
  cars,
  car,
  responsibleteam,
  level2
) {
  return `
  <div class="col-12 col-md-6">
    <label class="form-label" for="Date">Activity Date</label>
    <input class="form-control dt-input dt-full-name" id="Date" type="date" value="${date}" name="Date"/>
  </div>
  <div class="col-12 col-md-6">
    <label class="form-label" for="WorkflowTeams">Team</label>
    <select class="select2 form-select" id="select2Multiple" multiple="" data-select2-id="editteam">
      ${Employees.map((employee) => {
        return `
        <option value="${employee.name}" ${
          team.includes(employee.name) ? "selected" : ""
        }>${employee.name}</option>
        `;
      })}
    </select>
  </div>
  <div class="col-12 col-md-6">
    <label class="form-label" for="Workflowworkorder">Work Order</label>
    <input class="form-control" id="Workflowworkorder" type="text" value="${workorder}" name="Workflowworkorder" placeholder="Work Order"/>
  </div>
  <div class="col-12 col-md-6">
    <label class="form-label" for="WorkflowSite">Site</label>
    <select class="form-select" id="WorkflowSite" name="WorkflowSite" aria-label="Site">
      <option value=""></option>
      <option ${
        site === "41" ? "selected='selected'" : ""
      } value="41">41</option>
      <option ${
        site === "41-A" ? "selected='selected'" : ""
      } value="41-A">41-A</option>
      <option ${
        site === "41-B" ? "selected='selected'" : ""
      } value="41-B">41-B</option>
      <option ${
        site === "42" ? "selected='selected'" : ""
      } value="42">42</option>
      <option ${
        site === "43" ? "selected='selected'" : ""
      } value="43">43</option>
      <option ${
        site === "44" ? "selected='selected'" : ""
      } value="44">44</option>
      <option ${
        site === "45" ? "selected='selected'" : ""
      } value="45">45</option>
      <option ${
        site === "45-A" ? "selected='selected'" : ""
      } value="45-A">45-A</option>
      <option ${
        site === "45-B" ? "selected='selected'" : ""
      } value="45-B">45-B</option>
      <option ${
        site === "45-C" ? "selected='selected'" : ""
      } value="45-C">45-C</option>
    </select>
  </div>
  <div class="col-12 col-md-6">
    <label class="form-label" for="WorkflowType">Type</label>
    <select class="form-select" id="WorkflowType" name="WorkflowType" aria-label="Type">
      <option value=""></option>
      <option ${
        type === "CM" ? "selected='selected'" : ""
      } value="CM">CM</option>
      <option ${
        type === "PM" ? "selected='selected'" : ""
      } value="PM">PM</option>
      <option ${
        type === "Inspection" ? "selected='selected'" : ""
      } value="Inspection">Inspection</option>
    </select>
  </div>
  <div class="col-12 col-md-6">
    <label class="form-label" for="WorkflowStatus">Status</label>
    <select class="form-select" id="WorkflowStatus" name="WorkflowStatus" aria-label="Status">
      <option value=""></option>
      <option ${
        status === "open" ? "selected='selected'" : ""
      } value="open">Open</option>
      <option ${
        status === "under-observation" ? "selected='selected'" : ""
      } value="under-observation">Under Observation</option>
      <option ${
        status === "spare-part" ? "selected='selected'" : ""
      } value="spare-part">Spare Part</option>
      <option ${
        status === "closed" ? "selected='selected'" : ""
      } value="closed">Closed</option>
    </select>
  </div>
  <div class="col-12 col-md-6">
    <label class="form-label" for="WorkflowTimein">Time in</label>
    <input class="form-control" type="text" value="${timein}" placeholder="00:00"/>
  </div>
  <div class="col-12 col-md-6">
    <label class="form-label" for="WorkflowTimeout">Time Out</label>
    <input class="form-control" type="text" value="${timeout}" placeholder="23:59"/>
  </div>
  <div class="col-12 col-md-6">
    <label class="form-label" for="WorkflowDescription">Description</label>
    <input class="form-control" id="WorkflowDescription" type="text" value="${description}" name="WorkflowDescription" placeholder="P01 Defect"/>
  </div>
  <div class="col-12 col-md-6">
    <label class="form-label" for="WorkflowCar">Car</label>
    <select class="form-select" id="WorkflowCar" name="WorkflowCar" aria-label="Car">
      <option value=""></option>
      <option ${
        car === "closed" ? "selected='selected'" : ""
      } value="Parado 19">Parado 19</option>
      ${cars.map((c) => {
        return `
        <option value="${c.name}" ${
          c.name === car ? "selected='selected'" : ""
        }>${c.name}</option>
        `;
      })}
    </select>
  </div>
  <div class="col-12 col-md-6">
    <label class="form-label" for="WorkflowTeam">Responsible Team</label>
    <select class="form-select" id="WorkflowTeam" name="WorkflowTeam" aria-label="Team">
      <option value=""></option>
      <option ${
        responsibleteam === "Team A" ? "selected='selected'" : ""
      } value="Team A">Team A</option>
      <option ${
        responsibleteam === "Team B" ? "selected='selected'" : ""
      } value="Team B">Team B</option>
      <option ${
        responsibleteam === "Team C" ? "selected='selected'" : ""
      } value="Team C">Team C</option>
      <option ${
        responsibleteam === "Team D" ? "selected='selected'" : ""
      } value="Team D">Team D</option>
    </select>
  </div>
  <div class="col-12 col-md-6">
    <label class="form-label" for="WorkflowL2">L2 Support</label>
    <select class="form-select" id="WorkflowL2" name="WorkflowL2" aria-label="L2">
      <option value=""></option>
      <option ${level2 ? "selected='selected'" : ""} value="Yes">Yes</option>
      <option ${!level2 ? "selected='selected'" : ""} value="No">No</option>
    </select>
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
