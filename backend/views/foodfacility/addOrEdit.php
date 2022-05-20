<h3>{{viewTitle}}</h3>

<form action="/foodfacility" method="POST" autocomplete="off">
    <input type="hidden" name="_id" value="{{foodfacility._id}}">
    <div class="form-group">
        <label>Full Name</label>
        <input type="text" class="form-control" name="fullname" placeholder="Full Name" value="{{foodfacility.fullname}}">
        <div class="text-danger">
            {{foodfacility.fullnameError}}</div>
    </div>
    <div class="form-group">
        <label>Address</label>
        <input type="text" class="form-control" name="address" placeholder="Address" value="{{foodfacility.address}}">
        <div class="text-danger">
            {{foodfacility.emailError}}</div>
    </div>
    <div class="form-group">
        <label>Town</label>
        <input type="text" class="form-control" name="town" placeholder="Town" value="{{foodfacility.town}}">
        <div class="text-danger">
            {{foodfacility.emailError}}</div>
    </div>
    <div class="form-group">
        <label>District</label>
        <input type="text" class="form-control" name="district" placeholder="District" value="{{foodfacility.district}}">
        <div class="text-danger">
            {{foodfacility.emailError}}</div>
    </div>
     <div class="form-group">
        <label>Phone number</label>
        <input type="text" class="form-control" name="phone_number" placeholder="Phone_number" value="{{foodfacility.phone_number}}">
        <div class="text-danger">
            {{foodfacility.emailError}}</div>
    </div>
    <div class="form-group">
        <label>Business Type</label>
        <input type="text" class="form-control" name="business_type" placeholder="Business_type" value="{{foodfacility.business_type}}">
        <div class="text-danger">
            {{foodfacility.emailError}}</div>
    </div>
    <div class="form-group">
        <label>Certification Number</label>
        <input type="text" class="form-control" name="certification" placeholder="Certification" value="{{foodfacility.certification}}">
        <div class="text-danger">
            {{foodfacility.emailError}}</div>
    </div>
    <div class="form-group">
        <button type="submit" class="btn btn-info"><i class="fa fa-database"></i> Submit</button>
        <a class="btn btn-secondary" href="/foodfacility/list"><i class="fa fa-list-alt"></i> View All</a>
    </div>
    
</form>