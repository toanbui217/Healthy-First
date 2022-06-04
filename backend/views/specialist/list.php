<h3><a class="btn btn-secondary" href="/specialist"><i class="fa fa-plus"></i> Create New</a> Specialist List</h3>
<table class="table table-striped">
    <thead>
        <tr>
            <th>Id</th>
            <th>Full Name</th>
            <th>Address</th>
            <th>Town</th>
            <th>District</th>
            <th>Phone number</th>
            <th>Location</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        {{#each list}}
        <tr>
            
            <td>{{this.id}}</td>
            <td>{{this.fullname}}</td>
            <td>{{this.address}}</td>
            <td>{{this.town}}</td>
            <td>{{this.district}}</td>
            <td>{{this.phone_number}}</td>
            <td>{{this.location}}</td>
            
            <td>
                <a href="/specialist/{{this._id}}"><button type="submit">update</button></a>
                <a href="/specialist/delete/{{this._id}}" onclick="return confirm('Are you sure to delete this record ?');"> <button type="submit">delete</button></a> 
            </td>
        </tr>
        {{/each}}
    </tbody>
</table>