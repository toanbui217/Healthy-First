<h3>{{viewTitle}}</h3>

<form action="/certification" method="POST" autocomplete="off">
    <input type="hidden" name="_id" value="{{certification._id}}">
    <div class="form-group">
        <label>certification_number</label>
        <input type="text" class="form-control" name="certification_number" placeholder="certification_number" value="{{certification.certification_number}}">
       
    </div>
    <div class="form-group">
        <label>MFG</label>
        <input type="date" class="form-control" name="MFG" placeholder="MFG" value="{{certification.MFG}}">
        
    </div>
    <div class="form-group">
        <label>expiration_date</label>
        <input type="date" class="form-control" name="expiration_date" placeholder="expiration_date" value="{{certification.expiration_date}}">
       
    </div>
    <div class="form-group">
        <label>environment</label>
        <input type="text" class="form-control" name="environment" placeholder="environment" value="{{certification.environment}}">
      
    </div>
     <div class="form-group">
        <label>appliances</label>
        <input type="text" class="form-control" name="appliances" placeholder="appliances" value="{{certification.appliances}}">
        
    </div>
    <div class="form-group">
        <label>water_source</label>
        <input type="text" class="form-control" name="water_source" placeholder="water_source" value="{{certification.water_source}}">
        
    </div>
    <div class="form-group">
        <label>ingredients</label>
        <input type="text" class="form-control" name="ingredients" placeholder="ingredients" value="{{certification.ingredients}}">
        
    </div>
    <div class="form-group">
        <label>food_preservation</label>
        <input type="text" class="form-control" name="food_preservation" placeholder="food_preservation" value="{{certification.food_preservation}}">
        
    </div>
    <div class="form-group">
        <label>waste_treatment</label>
        <input type="text" class="form-control" name="waste_treatment" placeholder="waste_treatment" value="{{certification.waste_treatment}}">
        
    </div>
    <div class="form-group">
        <label>owners</label>
        <input type="text" class="form-control" name="owners" placeholder="owners" value="{{certification.owners}}">
        
    </div>
    <div class="form-group">
        <label>processing</label>
        <input type="text" class="form-control" name="processing" placeholder="processing" value="{{certification.processing}}">
        
    </div>
   
    <div class="form-group">
        <button type="submit" class="btn btn-info"><i class="fa fa-database"></i> Submit</button>
        <a class="btn btn-secondary" href="/certification/list"><i class="fa fa-list-alt"></i> View All</a>
    </div>
    
</form>