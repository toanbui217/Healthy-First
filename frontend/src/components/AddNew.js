import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { selection_attribute } from "../data/Attribute";
import hanoi from "../data/HanoiDistrict";
import "./AddNew.css";

function AddNew({ open, handleClose }) {
  const [certiNumber, setCertiNumber] = useState("");
  const [fullname, setFullname] = useState("");
  const [error, setError] = useState(false);
  const [district, setDistrict] = useState("Quận Cầu Giấy");
  const [town, setTown] = useState("Phường Mai Dịch");
  const [street, setStreet] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [businessType, setBusinessType] = useState([]);
  const [criteria, setCriteria] = useState({
    environment: true,
    appliances: true,
    waterSource: true,
    ingredients: true,
    foodPreservation: true,
    wasteTreatment: true,
    owners: true,
    processing: true,
  });

  useEffect(() => {
    setTown(hanoi.districts.find((d) => d.name == district).wards[0].name);
  }, [district]);

  const changeBusinessType = (e, type) => {
    var value = e.target.checked;
    var tmp = JSON.parse(JSON.stringify(businessType));
    if (value) {
      tmp.push(type);
    } else {
      tmp = tmp.filter((item) => item !== type);
    }
    setBusinessType(tmp);
  };

  const changeCriteria = (e, criterion) => {
    var value = e.target.value == "true";
    var tmp = JSON.parse(JSON.stringify(criteria));
    tmp[criterion] = value;
    setCriteria(tmp);
  };

  const handleChangeCertiNumber = (e) => {
    setError(false);
    setCertiNumber(e.target.value);
  };

  const handleChangeFullname = (e) => {
    setError(false);
    setFullname(e.target.value);
  };

  const handleChangeStreet = (e) => {
    setError(false);
    setStreet(e.target.value);
  };

  const handleChangePhoneNumber = (e) => {
    setError(false);
    setPhoneNumber(e.target.value);
  };

  const handleChangeDistrict = (e) => {
    setDistrict(e.target.value);
  };

  const handleChangeTown = (e) => {
    setTown(e.target.value);
  };

  const handleAddNew = () => {
    setError(true);
    var mfg = new Date();
    var exp = new Date(new Date().setFullYear(new Date().getFullYear() + 3));
    fetch("/foodfacility/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullname: fullname,
        street: street,
        town: town,
        district: hanoi.districts.find((d) => d.name == district)
          .short_codename,
        city: "Hà Nội",
        phone_number: phoneNumber,
        business_type: businessType,
        environment: criteria.environment,
        appliances: criteria.appliances,
        water_source: criteria.waterSource,
        ingredients: criteria.ingredients,
        food_preservation: criteria.foodPreservation,
        waste_treatment: criteria.wasteTreatment,
        owners: criteria.owners,
        processing: criteria.processing,
        certification: certiNumber,
        MFG: mfg,
        expiration_date: exp,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        handleClose();
      });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <div>
          <div className="modal__container">
            <div className="modal__header">
              <h2>Giấy chứng nhận cơ sở</h2>
              <Button className="modal__add" onClick={handleAddNew}>
                <CheckCircleRoundedIcon />
                Thêm
              </Button>
            </div>
            <div className="modal__body">
              <h2>
                Giấy chứng nhận cơ sở đử điều kiện an toàn thực phẩm có hiệu lực
                trong vòng <strong>3</strong> năm {"("}kể từ ngày cấp{")"}
              </h2>
              <TextField
                placeholder="208/2019/NNPTNT-HAN"
                type={"text"}
                label="Số cấp Giấy chứng nhận"
                className="modal__textfield"
                color="secondary"
                size="small"
                focused
                fullWidth
                value={certiNumber}
                onChange={handleChangeCertiNumber}
                error={error && certiNumber == ""}
                helperText={
                  error && certiNumber == "" && "Miền này không được để trống"
                }
                inputProps={{
                  className: "modal__textfield__input",
                }}
              />
              <TextField
                placeholder="Tiệm bánh"
                type={"text"}
                label="Tên đầy đủ"
                className="modal__textfield"
                color="secondary"
                size="small"
                focused
                fullWidth
                value={fullname}
                onChange={handleChangeFullname}
                error={error && fullname == ""}
                helperText={
                  error && fullname == "" && "Miền này không được để trống"
                }
                inputProps={{
                  className: "modal__textfield__input",
                }}
              />
              <div className="modal__address__container">
                <TextField
                  id="outlined-disabled"
                  label="Thành phố"
                  className="modal__textfield"
                  color="secondary"
                  size="small"
                  focused
                  value="Thành phố Hà Nội"
                  inputProps={{
                    className: "modal__textfield__input",
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  select
                  label="Quận/Huyện"
                  className="modal__textfield"
                  color="secondary"
                  size="small"
                  focused
                  value={district}
                  onChange={handleChangeDistrict}
                  inputProps={{
                    className: "modal__textfield__input",
                  }}
                >
                  {hanoi.districts.map((d, index) => (
                    <MenuItem key={index} value={d.name}>
                      {d.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  label="Phường/Thị trấn/Xã"
                  className="modal__textfield"
                  color="secondary"
                  size="small"
                  focused
                  value={town}
                  onChange={handleChangeTown}
                  inputProps={{
                    className: "modal__textfield__input",
                  }}
                >
                  {hanoi.districts
                    .find((d) => d.name == district)
                    .wards.map((w, index) => (
                      <MenuItem key={index} value={w.name}>
                        {w.name}
                      </MenuItem>
                    ))}
                </TextField>

                <TextField
                  placeholder="Số 1, Phạm Văn Đồng"
                  type={"text"}
                  id="outlined-disabled"
                  label="Địa chỉ"
                  className="modal__textfield"
                  color="secondary"
                  size="small"
                  focused
                  value={street}
                  onChange={handleChangeStreet}
                  error={error && street == ""}
                  helperText={
                    error && street == "" && "Miền này không được để trống"
                  }
                  inputProps={{
                    className: "modal__textfield__input",
                  }}
                />
              </div>
              <TextField
                placeholder="0123453489"
                type={"text"}
                id="outlined-disabled"
                label="Số điện thoại"
                className="modal__textfield"
                color="secondary"
                size="small"
                focused
                fullWidth
                value={phoneNumber}
                onChange={handleChangePhoneNumber}
                error={error && phoneNumber == ""}
                helperText={
                  error && phoneNumber == "" && "Miền này không được để trống"
                }
                inputProps={{
                  className: "modal__textfield__input",
                }}
              />
              <div className="modal__business__type">
                <h2>Loại hình kinh doanh</h2>
                <FormControlLabel
                  name="businessType"
                  control={
                    <Checkbox
                      size="small"
                      color="secondary"
                      checked={businessType.includes("sản xuất thực phẩm")}
                      onChange={(e) =>
                        changeBusinessType(e, "sản xuất thực phẩm")
                      }
                    />
                  }
                  label="Sản xuất thực phẩm"
                />
                <FormControlLabel
                  name="businessType"
                  control={
                    <Checkbox
                      size="small"
                      color="secondary"
                      checked={businessType.includes("dịch vụ ăn uống")}
                      onChange={(e) => changeBusinessType(e, "dịch vụ ăn uống")}
                    />
                  }
                  label="Dịch vụ ăn uống"
                />
                {error && businessType.length == 0 && (
                  <span>Miền này không được để trống</span>
                )}
              </div>
              <div className="modal__table__attr">
                <table>
                  <thead className={"modal__table__header"}>
                    <tr>
                      <th>Các tiêu chí</th>
                      <th>Đảm bảo</th>
                      <th>Không đảm bảo</th>
                    </tr>
                  </thead>
                  <tbody className="modal__table__body">
                    {selection_attribute.map((attr, index) => (
                      <tr key={index}>
                        <td>{attr.title}</td>
                        <td>
                          <FormControlLabel
                            name={attr.filter}
                            control={
                              <Radio
                                checked={criteria[attr.filter] == true}
                                value={"true"}
                                onChange={(e) => changeCriteria(e, attr.filter)}
                                size="small"
                              />
                            }
                            label={<CheckRoundedIcon />}
                            classes={{ label: "modal__attr__ensure" }}
                          />
                        </td>
                        <td>
                          <FormControlLabel
                            name={attr.filter}
                            control={
                              <Radio
                                checked={criteria[attr.filter] == false}
                                value={"false"}
                                onChange={(e) => changeCriteria(e, attr.filter)}
                                size="small"
                              />
                            }
                            label={<ClearRoundedIcon />}
                            classes={{ label: "modal__attr__not-ensure" }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}

export default AddNew;
