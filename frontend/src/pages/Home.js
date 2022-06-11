import React, { useState, useEffect, useRef } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import PrintRoundedIcon from "@mui/icons-material/PrintRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Avatar from "@mui/material/Avatar";
import Pagination from "@mui/material/Pagination";
import Tooltip from "@mui/material/Tooltip";
import Popover from "@mui/material/Popover";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange, Calendar } from "react-date-range";
import Filter from "../components/Filter";
import { format, parseISO } from "date-fns";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import AddNew from "../components/AddNew";
import {
  short_table_header,
  table_header,
  selection_attribute,
} from "../data/Attribute";
import { useFocus } from "../utils/CustomHook";
import hanoi from "../data/HanoiDistrict";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./Home.css";

const maxWord = [3, 2, 3, 4, 5, 2, 3, 2];
const rowPerPage = 10;
const districts = hanoi.districts.map((dist) => {
  return { name: dist.name, codename: dist.codename };
});
const user = JSON.parse(localStorage.getItem("user"));

function Home() {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [request, setRequest] = useState(false);
  const onRequest = () => {
    setRequest(!request);
  };

  const [currFac, setCurrFac] = useState({});
  const [detailCriteria, setDetailCriteria] = useState(false);
  const openDetailCriteria = (fac) => {
    setCurrFac(fac);
    setDetailCriteria(true);
  };
  const closeDetailCriteria = () => setDetailCriteria(false);

  // Open calendar
  const [inputRef, setInputFocus] = useFocus();

  const [openFilter, setOpenFilter] = useState(false);

  const [filterType, setFilterType] = useState("and");
  const [searchType, setSearchType] = useState("fullname");
  const [businessTypeFilter, setBusinessTypeFilter] = useState([]);
  const [criteria, setCriteria] = useState({
    environment: undefined,
    appliances: undefined,
    waterSource: undefined,
    ingredients: undefined,
    foodPreservation: undefined,
    wasteTreatment: undefined,
    owners: undefined,
    processing: undefined,
  });

  const [foodFacility, setFoodFacility] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [beforeSearchInput, setBeforeSearchInput] = useState("");

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPage: 0,
    total: 0,
  });

  const [filter, setFilter] = useState({
    page: 1,
    limit: rowPerPage,
    search: "",
    criteriaFilter: {
      environment: undefined,
      appliances: undefined,
      waterSource: undefined,
      ingredients: undefined,
      foodPreservation: undefined,
      wasteTreatment: undefined,
      owners: undefined,
      processing: undefined,
    },
    filterType: "and",
    searchType: "fullname",
  });

  // Popover
  const [anchor, setAnchor] = useState(null);
  // Date range
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const typingTimeout = useRef(null);

  useEffect(() => {
    var { page, limit, search, criteriaFilter, filterType, searchType } =
      filter;
    search = search.trim().toLowerCase();

    var data = {
      page: page,
      limit: limit,
      start_date: dateRange.startDate,
      end_date: dateRange.endDate,
      search: search,
      criteria_filter: {
        environment: criteriaFilter.environment,
        appliances: criteriaFilter.appliances,
        water_source: criteriaFilter.waterSource,
        ingredients: criteriaFilter.ingredients,
        food_preservation: criteriaFilter.foodPreservation,
        waste_treatment: criteriaFilter.wasteTreatment,
        owners: criteriaFilter.owners,
        processing: criteriaFilter.processing,
      },
      filter_type: filterType,
      search_type: searchType,
      business_type: businessTypeFilter,
    };

    fetch("/foodfacility/listlimit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.facilities.length > 0) {
          setBeforeSearchInput(search);
        }

        // Đổi tên quận từ `codename` sang `name`
        data.facilities.map((fac) => {
          fac.address.district = districts.find((dist) =>
            dist.codename.includes(fac.address.district)
          )?.name;
        });

        setFoodFacility(data.facilities);
        setPagination({
          currentPage: page,
          totalPage: Math.ceil(data.total / rowPerPage),
          total: data.total,
        });
      });
  }, [filter, request]);

  const handleSearch = (event, newInputValue) => {
    var value = newInputValue;
    setSearchInput(value);

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      setFilter((filter) => {
        return { ...filter, page: 1, search: value };
      });
    }, 200);
  };

  const handlePagination = (e, num) => {
    setFilter((filter) => {
      return { ...filter, page: num };
    });
  };

  const handleOpenFilter = () => {
    if (openFilter) {
      setCriteria({
        environment: undefined,
        appliances: undefined,
        waterSource: undefined,
        ingredients: undefined,
        foodPreservation: undefined,
        wasteTreatment: undefined,
        owners: undefined,
        processing: undefined,
      });
      setFilter((filter) => {
        return {
          ...filter,
          criteriaFilter: {
            environment: undefined,
            appliances: undefined,
            waterSource: undefined,
            ingredients: undefined,
            foodPreservation: undefined,
            wasteTreatment: undefined,
            owners: undefined,
            processing: undefined,
          },
          filterType: "and",
        };
      });
      setFilterType("and");
    }
    setOpenFilter((openFilter) => !openFilter);
  };

  const changeBusinessType = (e, type) => {
    var value = e.target.checked;
    var tmp = JSON.parse(JSON.stringify(businessTypeFilter));
    if (value) {
      tmp.push(type);
    } else {
      tmp.push(type);
      tmp = tmp.filter((item) => item !== type);
    }
    setBusinessTypeFilter(tmp);
  };

  const changeCriteriaFilter = (value, criterion) => {
    var tmp = JSON.parse(JSON.stringify(criteria));
    tmp[criterion] = value;
    setCriteria(tmp);
  };

  const handleSubmitFilter = () => {
    var tmpCriteria = JSON.parse(JSON.stringify(criteria));
    var tmpFilterType = JSON.parse(JSON.stringify(filterType));
    setFilter((filter) => {
      return {
        ...filter,
        criteriaFilter: tmpCriteria,
        filterType: tmpFilterType,
      };
    });
  };

  const handleChangeFilterType = () =>
    setFilterType((filterType) => {
      if (filterType == "and") {
        return "or";
      } else {
        return "and";
      }
    });

  const handleClearFilter = () => {
    setCriteria({
      environment: undefined,
      appliances: undefined,
      waterSource: undefined,
      ingredients: undefined,
      foodPreservation: undefined,
      wasteTreatment: undefined,
      owners: undefined,
      processing: undefined,
    });
    setBusinessTypeFilter([]);
  };

  const removeBusinessTypeFilter = () => setBusinessTypeFilter([]);
  const changeSearchType = () => {
    var tmpSearchType;
    if (searchType === "fullname") tmpSearchType = "certification";
    else tmpSearchType = "fullname";

    setSearchType(tmpSearchType);

    setFilter((filter) => {
      return {
        ...filter,
        searchType: tmpSearchType,
      };
    });

    setInputFocus();
  };

  const openPopover = (event) => {
    setAnchor(event.currentTarget);
  };

  const closePopover = (event) => {
    setAnchor(null);
  };

  const handleSelect = (ranges) => {
    setDateRange(ranges.selection);
  };

  const [currEditFac, setCurrEditFac] = useState();
  const [editFac, setEditFac] = useState(false);
  const openEditFac = (sample) => {
    setCurrEditFac(sample);
    setEditFac(true);
  };
  const closeEditFac = () => setEditFac(false);

  const [currCerti, setCurrCerti] = useState();
  const [pdfCerti, setPdfCerti] = useState(false);
  const openPdfCerti = (sample) => {
    setCurrCerti(sample);
    setPdfCerti(true);
  };
  const closePdfCerti = () => setPdfCerti(false);

  const testApi = () => {
    // fetch("/inspection/info", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     facilities: ["629ef10a6270eb060ac55ee9"],
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //   });
  };

  return (
    <div className="home">
      <div
        className={`home__filter__table ${
          openFilter ? "home__filter__table--active" : ""
        }`}
      >
        <div className="home__filter__table__header">
          <h2>Bộ lọc</h2>
          <div>
            <Button
              className="home__change__filter__type"
              onClick={handleChangeFilterType}
            >
              <AutorenewRoundedIcon />
            </Button>
            <Button className="home__clear__filter" onClick={handleClearFilter}>
              <ClearRoundedIcon />
            </Button>
          </div>
        </div>

        {/* Filter list */}
        <div className="home_filter_body">
          <div className="home__business__type__filter">
            <Tooltip
              title={"Khoảng thời gian còn hiệu lực"}
              arrow
              enterDelay={500}
            >
              <h2>Khoảng thời gian còn hiệu ...</h2>
            </Tooltip>
            <Button onClick={openPopover} className="home__calendar_btn">
              {format(dateRange.startDate, "dd/MM/yyyy")} đến{" "}
              {format(dateRange.endDate, "dd/MM/yyyy")}
            </Button>
            <Popover
              open={Boolean(anchor)}
              onClose={closePopover}
              anchorEl={anchor}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <DateRange ranges={[dateRange]} onChange={handleSelect} />
            </Popover>
          </div>
          <div className="home__business__type__filter">
            <div>
              <Tooltip title={"Loại hình kinh doanh"} arrow enterDelay={500}>
                <h2>Loại hình kinh doanh</h2>
              </Tooltip>

              {businessTypeFilter.length > 0 && (
                <Button
                  className="home__remove"
                  onClick={removeBusinessTypeFilter}
                >
                  <ClearRoundedIcon />
                </Button>
              )}
            </div>
            <FormControlLabel
              name="businessType"
              control={
                <Checkbox
                  size="small"
                  color="secondary"
                  checked={businessTypeFilter.includes("sản xuất thực phẩm")}
                  onChange={(e) => changeBusinessType(e, "sản xuất thực phẩm")}
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
                  checked={businessTypeFilter.includes("dịch vụ ăn uống")}
                  onChange={(e) => changeBusinessType(e, "dịch vụ ăn uống")}
                />
              }
              label="Dịch vụ ăn uống"
            />
          </div>

          {selection_attribute.map((attr, idx) => {
            return (
              <div key={idx}>
                <Filter
                  title={table_header[idx + 7]}
                  onChange={changeCriteriaFilter}
                  criteria={criteria}
                  filter={attr.filter}
                />

                {idx < selection_attribute.length - 1 && (
                  <div className="home__filter__type__text">
                    <h6>--- {filterType === "and" ? "và" : "hoặc"} ---</h6>
                  </div>
                )}
              </div>
            );
          })}

          <div className={"home__submit__filter__wrapper"}>
            <Button
              className="home__submit__filter"
              onClick={handleSubmitFilter}
            >
              <CheckCircleRoundedIcon />
              Xong
            </Button>
          </div>
        </div>
      </div>
      <div
        className={`home__content ${
          openFilter ? "home__content--collapse" : ""
        }`}
      >
        <div className="home__header">
          <div>
            <h2>Các cơ sở dịch vụ ăn uống</h2>
          </div>

          <div className="home__widget">
            <div className="home__widget--left">
              <div className="home__search">
                <Button
                  className="home__search__button"
                  onClick={setInputFocus}
                >
                  <SearchRoundedIcon />
                </Button>
                <Autocomplete
                  inputValue={searchInput}
                  onInputChange={handleSearch}
                  freeSolo
                  size="small"
                  disablePortal
                  options={foodFacility.slice(0, 5)}
                  getOptionLabel={(option) =>
                    searchType == "fullname"
                      ? option.fullname
                      : option.certification_number
                  }
                  sx={{ width: 330 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      focused
                      label="Movie"
                      className="home_search_auto"
                      placeholder={
                        searchType === "fullname"
                          ? "Tìm kiếm Tên cơ sở"
                          : "Tìm kiếm Số cấp Giấy chứng nhận"
                      }
                      inputRef={inputRef}
                    />
                  )}
                  renderOption={(props, option) => {
                    return (
                      <li {...props} key={option._id}>
                        {searchType == "fullname"
                          ? option.fullname
                          : option.certification_number}
                      </li>
                    );
                  }}
                />
                <Button
                  className="home__search__button"
                  onClick={changeSearchType}
                >
                  <AutorenewRoundedIcon />
                </Button>
              </div>
              <Button className="home__filter" onClick={handleOpenFilter}>
                <FilterListRoundedIcon />
                Lọc
              </Button>
            </div>
            {user.role == "MANAGER" && (
              <Button className="home__add" onClick={handleOpenModal}>
                <AddBusinessRoundedIcon />
                Thêm mới
              </Button>
            )}
            <AddNew open={openModal} handleClose={handleCloseModal} />
          </div>
        </div>
        <div className="home__table">
          <table>
            <thead className={"home__table__header"}>
              <tr>
                {short_table_header.map((item, index) => (
                  <th key={index}>
                    <Tooltip title={item} arrow enterDelay={200}>
                      <span>
                        {item.split(" ").length > maxWord[index]
                          ? item.split(" ").slice(0, maxWord[index]).join(" ") +
                            " ..."
                          : item}
                      </span>
                    </Tooltip>
                  </th>
                ))}

                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody className={"home__table__body"}>
              {foodFacility.length > 0 &&
                foodFacility.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="home__name__wrapper">
                        <Avatar
                          className="home__avatar"
                          alt={item.fullname}
                          src={item.avatar}
                        />
                        {searchType === "fullname" ? (
                          <p>
                            {item.fullname.slice(
                              0,
                              item.fullname
                                .toLowerCase()
                                .indexOf(beforeSearchInput.trim().toLowerCase())
                            )}
                            <span>
                              {item.fullname.slice(
                                item.fullname
                                  .toLowerCase()
                                  .indexOf(
                                    beforeSearchInput.trim().toLowerCase()
                                  ),
                                item.fullname
                                  .toLowerCase()
                                  .indexOf(
                                    beforeSearchInput.trim().toLowerCase()
                                  ) + beforeSearchInput.trim().length
                              )}
                            </span>
                            {item.fullname.slice(
                              item.fullname
                                .toLowerCase()
                                .indexOf(
                                  beforeSearchInput.trim().toLowerCase()
                                ) + beforeSearchInput.trim().length
                            )}
                          </p>
                        ) : (
                          <p>{item.fullname}</p>
                        )}
                      </div>
                    </td>
                    <td>
                      {item.address.street +
                        ", " +
                        item.address.town +
                        ", " +
                        item.address.district +
                        ", " +
                        item.address.city}
                    </td>
                    <td>{item.phone_number}</td>
                    <td>
                      {item.business_type.map((value, idx) => (
                        <div key={idx}>
                          <div
                            className={
                              value[0] == "S" || value[0] == "s"
                                ? "home__business__type1"
                                : "home__business__type2"
                            }
                          >
                            {value}
                          </div>
                        </div>
                      ))}
                    </td>
                    <td className="home__number__wrapper">
                      {searchType === "certification" ? (
                        <p>
                          {item.certification_number.slice(
                            0,
                            item.certification_number
                              .toLowerCase()
                              .indexOf(beforeSearchInput.trim().toLowerCase())
                          )}
                          <span>
                            {item.certification_number.slice(
                              item.certification_number
                                .toLowerCase()
                                .indexOf(
                                  beforeSearchInput.trim().toLowerCase()
                                ),
                              item.certification_number
                                .toLowerCase()
                                .indexOf(
                                  beforeSearchInput.trim().toLowerCase()
                                ) + beforeSearchInput.trim().length
                            )}
                          </span>
                          {item.certification_number.slice(
                            item.certification_number
                              .toLowerCase()
                              .indexOf(beforeSearchInput.trim().toLowerCase()) +
                              beforeSearchInput.trim().length
                          )}
                        </p>
                      ) : (
                        <p>{item.certification_number}</p>
                      )}
                    </td>
                    <td>
                      {item.certification?.expiration_date &&
                        format(parseISO(item.certification.MFG), "dd/MM/yyyy")}
                    </td>
                    <td>
                      {item.certification?.expiration_date &&
                        format(
                          parseISO(item.certification.expiration_date),
                          "dd/MM/yyyy"
                        )}
                    </td>
                    <td onClick={() => openDetailCriteria(item)}>
                      <span>
                        {
                          selection_attribute
                            .map((attr) => item[attr.code])
                            .filter((criteria) => criteria).length
                        }
                        <CheckRoundedIcon className="ensure" />
                      </span>
                      <span>
                        {
                          selection_attribute
                            .map((attr) => item[attr.code])
                            .filter((criteria) => !criteria).length
                        }
                        <ClearRoundedIcon className="not_ensure" />
                      </span>
                    </td>

                    <td>
                      {user.role == "MANAGER" && (
                        <Button
                          className="home__edit"
                          onClick={() => openEditFac(item)}
                        >
                          <ModeEditRoundedIcon />
                        </Button>
                      )}
                    </td>
                    <td>
                      {user.role == "MANAGER" && (
                        <Button
                          className="home__print"
                          onClick={() => openPdfCerti(item)}
                        >
                          <PrintRoundedIcon />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="home_pagination_wrapper">
          <Pagination
            className="home__pagination"
            count={pagination.totalPage}
            color="secondary"
            onChange={handlePagination}
            page={pagination.currentPage}
          />
          <h2>Có {pagination.total} bản ghi</h2>
        </div>
        <DetailCriteria
          facility={currFac}
          open={detailCriteria}
          handleClose={closeDetailCriteria}
        />
        <EditFacility
          facility={currEditFac}
          open={editFac}
          handleClose={closeEditFac}
          onRequest={onRequest}
        />
        <PdfCertification
          certi={currCerti}
          open={pdfCerti}
          handleClose={closePdfCerti}
        />
      </div>
    </div>
  );
}

const DetailCriteria = ({ facility, open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <div className="home_detail_criteria">
          <h2>Chi tiết</h2>
          <div>
            <tr>
              <td>Tên cơ sở</td>
              <td>{facility.fullname}</td>
            </tr>
            <tr>
              <td>Số cấp Giấy chứng nhận</td>
              <td>{facility.certification_number}</td>
            </tr>
            {selection_attribute.map((attr, index) => (
              <tr key={index}>
                <td>{attr.title}</td>
                <td>
                  {facility[attr.code] ? (
                    <>
                      Đảm bảo
                      <CheckRoundedIcon className="ensure" />
                    </>
                  ) : (
                    <>
                      Không đảm bảo
                      <ClearRoundedIcon className="not_ensure" />
                    </>
                  )}
                </td>
              </tr>
            ))}
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

const EditFacility = ({ facility, open, handleClose, onRequest }) => {
  const [fullname, setFullname] = useState("");
  const [street, setStreet] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    setFullname((facility && facility.fullname) || "");
    setPhoneNumber((facility && facility.phone_number) || "");
    setStreet((facility && facility.address.street) || "");
  }, [facility]);

  const onChangeFullname = (e) => {
    setFullname(e.target.value);
  };
  const onChangeStreet = (e) => {
    setStreet(e.target.value);
  };
  const onChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handleEdit = (e) => {
    fetch("/foodfacility/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...facility,
        fullname: fullname,
        address: {
          ...facility.address,
          street: street,
        },
        phone_number: phoneNumber,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        handleClose();
        onRequest();
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
        <div className="home_detail_criteria">
          <h2>Chỉnh sửa</h2>
          {facility && (
            <div className="sched_fac_table">
              <tr>
                <td>Tên cơ sở</td>
                <td>
                  <input
                    type="text"
                    className="sched_fac_input"
                    value={fullname}
                    onChange={onChangeFullname}
                  />
                </td>
              </tr>
              <tr>
                <td>Số điện thoại</td>
                <td>
                  <input
                    type="text"
                    className="sched_fac_input"
                    value={phoneNumber}
                    onChange={onChangePhoneNumber}
                  />
                </td>
              </tr>
              <tr>
                <td>Địa chỉ</td>
                <td>
                  <input
                    type="text"
                    className="sched_fac_input"
                    value={street}
                    onChange={onChangeStreet}
                  />
                </td>
              </tr>
            </div>
          )}
          <Button className="sched_fac_after_add" onClick={handleEdit}>
            <CheckCircleRoundedIcon />
            Xong
          </Button>
        </div>
      </Fade>
    </Modal>
  );
};

const PdfCertification = ({ certi, open, handleClose }) => {
  const exportPDF = () => {
    const input = document.getElementById("content");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const pdf = new jsPDF("p", "mm", "a6");
      pdf.addImage(imgData, "PNG", 1, 1);
      pdf.save("healthyFirst.pdf");
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
        <div class={"cer_box_wrapper"}>
          {certi && (
            <div id="content">
              <div className="cer_box">
                <table cellSpacing={"0"} cellPadding={"0"}>
                  <tr>
                    <td className="title">
                      CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                    </td>
                  </tr>
                  <tr>
                    <td className="title">Độc lập - Tự do - Hạnh phúc</td>
                  </tr>
                  <tr>
                    <td className="title">--------------------</td>
                  </tr>
                  <tr>
                    <td className="title">GIẤY CHỨNG NHẬN</td>
                  </tr>
                  <tr>
                    <td className="title">
                      CƠ SỞ ĐỦ ĐIỀU KIỆN VỆ SINH AN TOÀN THỰC PHẨM
                    </td>
                  </tr>
                  <tr>
                    <td className="title">
                      TRUNG TÂM Y TẾ DỰ PHÒNG TỈNH/THÀNH PHỐ HÀ NỘI
                    </td>
                  </tr>
                  <tr>
                    <td className="title">CHỨNG NHẬN</td>
                  </tr>
                  <tr>
                    <td>
                      <p>
                        <strong>Tên cơ sở: </strong> {certi.fullname}
                      </p>
                      <p>
                        <strong>Địa chỉ: </strong>
                        {certi.address.street +
                          ", " +
                          certi.address.town +
                          ", " +
                          certi.address.district +
                          ", " +
                          certi.address.city}
                      </p>
                      <p>
                        <strong>Điện thoại: </strong>

                        <input type="text" name="phone_number" />
                      </p>
                      <p id="dam">
                        Đủ điều kiện vệ sinh, an toàn thực phẩm để sản xuất,
                        kinh doanh:
                      </p>
                      <input type="text" name="business_type" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <tr>
                        <td>
                          <p id="dam">Số cấp: {certi.certification_number}</p>
                        </td>
                        <td id="kyten">
                          <p>Hà Nội, ngày 7 tháng 6 năm 2022</p>
                          <p id="dam">Quản lý</p>
                          <p id="nghieng">(ký tên & đóng dấu)</p>
                        </td>
                      </tr>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          )}
          <button onClick={exportPDF}>Click để xuất file PDF</button>
        </div>
      </Fade>
    </Modal>
  );
};

export default Home;
