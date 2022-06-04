<h3>{{viewTitle}}</h3>

<form action="/checkfacility" method="POST" autocomplete="off">
    <input type="hidden" name="_id" value="{{checkfacility._id}}">
    <div class="form-group">
        <label>Start date</label>
        <input type="date" class="form-control" name="start_date" placeholder="Start date" value="{{checkfacility.start_date}}">
    </div>
    <div class="form-group">
        <label>End date</label>
        <input type="date" class="form-control" name="end_date" placeholder="End date" value="{{checkfacility.end_date}}">
    </div>
    <div class="form-group">
        <label>Id</label>
        <input type="text" class="form-control" name="id" placeholder="Id" value="{{checkfacility.id}}">
        <div class="text-danger">
            {{checkfacility.idError}}</div>
    </div>
    <div class="form-group">
        <label>Name</label>
        <input type="text" class="form-control" name="name" placeholder="Name" value="{{checkfacility.name}}">
        <div class="text-danger">
            {{checkfacility.nameError}}</div>
    </div>
     <div class="form-group">
        <label>Unit</label>
        <input type="text" class="form-control" name="unit" placeholder="Unit" value="{{checkfacility.unit}}">
        <div class="text-danger">
            {{checkfacility.unitError}}</div>
    </div>
    <div class="form-group">
        <label>Start Date</label>
        <input type="date" class="form-control" name="start_date" placeholder="Start Date" value="{{checkfacility.start_date}}">
    </div>
    <div class="form-group">
        <label>End Date</label>
        <input type="date" class="form-control" name="end_date" placeholder="Certification" value="{{checkfacility.end_date}}">
    </div>
    <div class="form-group">
        <label>Result</label>
        <input type="checkbox" class="form-control" name="result" placeholder="Result" value="{{checkfacility.result}}">
    </div>
    <div class="form-group">
        <label>Decision</label>
        <input type="text" class="form-control" name="decision" placeholder="Decision" value="{{checkfacility.decision}}">
        <div class="text-danger">
            {{checkfacility.decisionError}}</div>
    </div>
    <div class="form-group">
        <label>Confirm</label>
        <input type="checkbox" class="form-control" name="confirm" placeholder="Confirm" value="{{checkfacility.confirm}}">
    </div>

    <div class="form-group">
        <label>Facility Number</label>
        <input type="text" class="form-control" name="facility_number" placeholder="Facility Number" value="{{checkfacility.facility_number}}">
        <div class="text-danger">
            {{checkfacility.facility_numberError}}</div>
    </div>
    <div class="form-group">
        <label>Specialist Id</label>
        <input type="text" class="form-control" name="specialist_id" placeholder="Specialist Id" value="{{checkfacility.specialist_id}}">
        <div class="text-danger">
            {{checkfacility.specialist_idError}}</div>
    </div>
    <div class="form-group">
        <button type="submit" class="btn btn-info"><i class="fa fa-database"></i> Submit</button>
        <a class="btn btn-secondary" href="/checkfacility/list"><i class="fa fa-list-alt"></i> View All</a>
    </div>
    
</form>