<?php
    $conn_giay = 'Data\giay_chung_nhan.json';
    $conn_coso = 'Data\co_so.json';
    
    $obj_giay = json_decode($conn_giay);
    $obj_coso = json_decode($conn_coso);
    

    // duration
    if isset($_POST['duration']){
        $durtion = $_POST['duration'];
        $futureDate = mktime(0, 0, 0, date("m")+$durtion, date("d"), date("Y"));
        
        foreach($obj_giay as $key == 'MFG' => $value){
            $today = strtotime(Y/m/d);
            $MFG = $key => $value;
            // lấy năm/tháng/ngày đăng ký
            $Year = floor(strtotime($MFG) / (365*60*60*24));
            $Month = floor((strtotime($MFG) - $years * 365*60*60*24) / (30*60*60*24));
            $Day = floor((strtotime($MFG) - $years * 365*60*60*24 - $months*30*60*60*24)/ (60*60*24));
            $MFG_to_today = $today - strtotime($MFG);
            $MFG_to_futureDate = $futureDate - strtotime($MFG);
            
            $month_diff_today = $MFG_to_today / (30*60*60*24);
            $month_diff_furure = $MFG_to_futureDate / (30*60*60*24);

            if (ceil($month_diff_today / 6) == floor($month_diff_furure / 6)){
                $inspection_date = date("Y/m/d", mktime(0,0,0,$Month+ceil($month_diff_today / 6), $Day, $Year))
                foreach($obj_coso as $key1 == 'certification' => $certification){
                    if ($certification == $obj_giay[$key]){
                        echo $obj_coso -> fullname;
                        echo $obj_coso -> street;
                        echo $obj_coso -> town;
                        echo $obj_coso -> district;
                        echo $obj_coso -> city;
                        echo $obj_coso -> phone_number;
                        echo $obj_coso -> business_type;
                        echo $obj_coso -> environment;
                        echo $obj_coso -> appliances;
                        echo $obj_coso -> water_source;
                        echo $obj_coso -> ingredients;
                        echo $obj_coso -> food_preservation;
                        echo $obj_coso -> waste_treatment;
                        echo $obj_coso -> owners;
                        echo $obj_coso -> processing;
                        echo $obj_coso -> certification;
                        echo $inspection_date
                    }
                }
            }
            
            
            /*
            $month_diff = $MFG_to_today / (30*60*60*24);
            if ($month_diff % 6 != 0){
                $inspection_date = date("Y/m/d", mktime(0,0,0,$Month+$month_diff+(6 - $month_diff%6), $Day, $Year))
                if (strtotime($inspection_date) - $today >= 0 && strtotime($futureDate) - strtotime($inspection_date) <= 0){
                    echo $obj
                    echo $inspection_date
                }
            }
            else{
                $inspection_date = date("Y/m/d", mktime(0,0,0,$Month+$month_diff, $Day, $Year))
                if (strtotime($inspection_date) - $today >= 0 && strtotime($futureDate) - strtotime($inspection_date) <= 0){
                    
                    echo $inspection_date
                }
            }
            */
        }
    }


    // post 2 
    $conn_specialist = 'specialist.json';
    $conn_checkfacility = 'checkfacility.json';

    $obj_specialist = json_decode($conn_specialist);
    $obj_checkfacility = json_decode($conn_checkfacility);

    if isset($_POST['specialist_id']){
        $specialist_id = $_POST['specialist_id']
        foreach ($obj_checkfacility as $key == 'specialist_id' => $value){
            if ($value == $specialist_id){
                echo $obj_checkfacility -> start_date;
                echo $obj_checkfacility -> end_date;
                echo $obj_checkfacility -> food_sample;
                echo $obj_checkfacility -> decision;
                echo $obj_checkfacility -> confirm;
                echo $obj_checkfacility -> facility_number;
                echo $obj_checkfacility -> specialist_id;
            }
        }
    }
    

?>