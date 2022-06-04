<h3>{{viewTitle}}</h3>

<form action="/specialist" method="POST" autocomplete="off">
    <input type="hidden" name="_id" value="{{specialist._id}}">
    <div class="form-group">
        <label>Id</label>
        <input type="text" class="form-control" name="id" placeholder="Id" value="{{specialist.id}}">
        <div class="text-danger">
            {{specialist.idError}}</div>
    </div>
    <div class="form-group">
        <label>Full Name</label>
        <input type="text" class="form-control" name="fullname" placeholder="Full Name" value="{{specialist.fullname}}">
        <div class="text-danger">
            {{specialist.fullnameError}}</div>
    </div>
    <div class="form-group">
        <label>Address</label>
        <input type="text" class="form-control" name="address" placeholder="Address" value="{{specialist.address}}">
        <div class="text-danger">
            {{specialist.emailError}}</div>
    </div>
    <div class="form-group">
        <label>Town</label>
        <input type="text" class="form-control" name="town" placeholder="Town" value="{{specialist.town}}">
        <div class="text-danger">
            {{specialist.emailError}}</div>
    </div>
    <div class="form-group">
        <label>District</label>
        <input type="text" class="form-control" name="district" placeholder="District" value="{{specialist.district}}">
        <div class="text-danger">
            {{specialist.emailError}}</div>
    </div>
     <div class="form-group">
        <label>Phone number</label>
        <input type="text" class="form-control" name="phone_number" placeholder="Phone_number" value="{{specialist.phone_number}}">
        <div class="text-danger">
            {{specialist.emailError}}</div>
    </div>
    <div class="form-group">
        <label>Location</label>
        <input type="text" class="form-control" name="location" placeholder="Location" value="{{specialist.location}}">
        <div class="text-danger">
            {{specialist.emailError}}</div>
    </div>
    <div class="form-group">
        <button type="submit" class="btn btn-info"><i class="fa fa-database"></i> Submit</button>
        <a class="btn btn-secondary" href="/specialist/list"><i class="fa fa-list-alt"></i> View All</a>
    </div>
    
</form>