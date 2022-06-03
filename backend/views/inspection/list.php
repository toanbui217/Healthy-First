<h3><a class="btn btn-secondary" href="/checkfacility"><i class="fa fa-plus"></i> Create New</a> Checkfacility List</h3>
<table class="table table-striped">
    <thead>
        <tr>
            <th>Start date</th>
            <th>End date</th>
            <th>Id</th>
            <th>Name</th>
            <th>Unit</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Result</th>
            <th>Decision</th>
            <th>Confirm</th>
            <th>Facility Number</th>
            <th>Specialist Id</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        {{#each list}}
        <tr>
            
            <td>{{this.start_date}}</td>
            <td>{{this.end_date}}</td>
            <td>{{this.id}}</td>
            <td>{{this.name}}</td>
            <td>{{this.unit}}</td>
            <td>{{this.start_date}}</td>
            <td>{{this.end_date}}</td>
            <td>{{this.result}}</td>
            <td>{{this.decision}}</td>
            <td>{{this.confirm}}</td>
            <td>{{this.facility_number}}</td>
            <td>{{this.specialist_id}}</td>
            
            <td>
                <a href="/checkfacility/{{this._id}}"><button type="submit">update</button></a>
                <a href="/checkfacility/delete/{{this._id}}" onclick="return confirm('Are you sure to delete this record ?');"> <button type="submit">delete</button></a> 
            </td>
        </tr>
        {{/each}}
    </tbody>
</table>