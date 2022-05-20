<h3><a class="btn btn-secondary" href="/foodfacility"><i class="fa fa-plus"></i> Create New</a> FoodFacility List</h3>
<table class="table table-striped">
    <thead>
        <tr>
            <th>Full Name</th>
            <th>Address</th>
            <th>Town</th>
            <th>District</th>
            <th>Phone number</th>
            <th>Business Type</th>
            <th>Certification Number</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        {{#each list}}
        <tr>
            
            <td>{{this.fullname}}</td>
            <td>{{this.address}}</td>
            <td>{{this.town}}</td>
            <td>{{this.district}}</td>
            <td>{{this.phone_number}}</td>
            <td>{{this.business_type}}</td>
            <td>{{this.certification}}</td>
            
            <td>
                <a href="/foodfacility/{{this._id}}"><button type="submit">update</button></a>
                <a href="/foodfacility/delete/{{this._id}}" onclick="return confirm('Are you sure to delete this record ?');"> <button type="submit">delete</button></a> 
            </td>
        </tr>
        {{/each}}
    </tbody>
</table>