import React from "react";
import "./add-expense.scss";
import $ from "jquery";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
export const AddExpense = () => {
  //   $(function() {
  //   var content = "<input type='text' class='bss-input' onKeyDown='event.stopPropagation();' onKeyPress='addSelectInpKeyPress(this,event)' onClick='event.stopPropagation()' placeholder='Add item'> <span class='glyphicon glyphicon-plus addnewicon' onClick='addSelectItem(this,event,1);'></span>";

  //   var divider = $('<option/>')
  //           .addClass('divider')
  //           .data('divider', true);

  //   var addoption = $('<option/>', {class: 'addItem'})
  //           .data('content', content)

  //   $('.selectpicker')
  //           .append(divider)
  //           .append(addoption)
  //           .selectpicker();

  // });

  // function addSelectItem(t,ev)
  // {
  //    ev.stopPropagation();

  //    var bs = $(t).closest('.bootstrap-select')
  //    var txt=bs.find('.bss-input').val().replace(/[|]/g,"");
  //    var txt=$(t).prev().val().replace(/[|]/g,"");
  //    if ($.trim(txt)=='') return;

  //    // Changed from previous version to cater to new
  //    // layout used by bootstrap-select.
  //    var p=bs.find('select');
  //    var o=$('option', p).eq(-2);
  //    o.before( $("<option>", { "selected": true, "text": txt}) );
  //    p.selectpicker('refresh');
  // }

  // function addSelectInpKeyPress(t,ev)
  // {
  //    ev.stopPropagation();

  //    // do not allow pipe character
  //    if (ev.which==124) ev.preventDefault();

  //    // enter character adds the option
  //    if (ev.which==13)
  //    {
  //       ev.preventDefault();
  //       addSelectItem($(t).next(),ev);
  //    }
  // }
  let departments = [
    {
      id: 1,
      name: "Administrative",
      icon: "uil-dashboard",
      isSelected: false,
      brands: [
        {
          id: 1,
          name: "3K Battery",
          src: "../../../../../images/brands/brand2.png",
          users: [
            {
              id: 1,
              name: "Jack Grealish ",
              src: "../../../../../images/users/avatar1.jpg",
            },
            {
              id: 2,
              name: "Jan Wick",
              src: "../../../../../images/users/avatar2.jpg",
            },
            {
              id: 3,
              name: "Sara Grealish",
              src: "../../../../../images/users/avatar11.png",
            },
            {
              id: 3,
              name: "Jon Grealish",
              src: ".../../../../../images/users/avatar.jpg",
            },
          ],
        },
        {
          id: 2,
          name: "Deye",
          src: ".../../../../../images/brands/brand2.png",
          users: [
            {
              id: 1,
              name: "Jack Grealish ",
              src: ".../../../../../images/users/avatar2.jpg",
            },
            {
              id: 2,
              name: "Jan Wick",
              src: ".../../../../../images/users/avatar2.jpg",
            },
            {
              id: 3,
              name: "Sara Grealish",
              src: ".../../../../../images/users/avatar11.png",
            },
          ],
        },
        {
          id: 3,
          name: "Doglin",
          src: ".../../../../../images/brands/brand3.png",
          users: [
            {
              id: 1,
              name: "Jack Grealish ",
              src: ".../../../../../images/users/avatar11.png",
            },
            {
              id: 2,
              name: "Jan Wick",
              src: ".../../../../../images/users/avatar1.jpg",
            },
            {
              id: 3,
              name: "Sara Grealish",
              src: ".../../../../../images/users/avatar2.jpg",
            },
          ],
        },
        {
          id: 4,
          name: "GROWATT",
          src: ".../../../../../images/brands/brand4.png",
          users: [
            {
              id: 1,
              name: "Jack Grealish ",
              src: ".../../../../../images/users/avatar11.png",
            },
            {
              id: 2,
              name: "Jan Wick",
              src: ".../../../../../images/users/avatar10.png",
            },
            {
              id: 3,
              name: "Sara Grealish",
              src: ".../../../../../images/users/avatar9.png",
            },
          ],
        },
        {
          id: 5,
          name: "MUST",
          src: ".../../../../../images/brands/brand5.png",
          users: [
            {
              id: 1,
              name: "Jack Grealish ",
              src: ".../../../../../images/users/avatar11.png",
            },
            {
              id: 2,
              name: "Jan Wick",
              src: ".../../../../../images/users/avatar1.jpg",
            },
            {
              id: 3,
              name: "Sara Grealish",
              src: ".../../../../../images/users/avatar2.jpg",
            },
          ],
        },
        {
          id: 6,
          name: "LUMINOUS",
          src: ".../../../../../images/brands/brand6.png",
          users: [
            {
              id: 1,
              name: "Jack Grealish ",
              src: ".../../../../../images/users/avatar1.jpg",
            },
            {
              id: 2,
              name: "Jan Wick",
              src: ".../../../../../images/users/avatar2.jpg",
            },
            {
              id: 3,
              name: "Sara Grealish",
              src: ".../../../../../images/users/avatar11.png",
            },
          ],
        },
        {
          id: 7,
          name: "ROCKET",
          src: ".../../../../../images/brands/brand7.png",
          users: [
            {
              id: 1,
              name: "Jack Grealish ",
              src: ".../../../../../images/users/avatar11.png",
            },
            {
              id: 2,
              name: "Jan Wick",
              src: ".../../../../../images/users/avatar11.png",
            },
            {
              id: 3,
              name: "Sara Grealish",
              src: ".../../../../../images/users/avatar1.jpg",
            },
          ],
        },
        {
          id: 8,
          name: "Felicity Solar",
          src: ".../../../../../images/brands/brand8.png",
          users: [
            {
              id: 1,
              name: "Jack Grealish ",
              src: ".../../../../../images/users/avatar1.jpg",
            },
            {
              id: 2,
              name: "Jan Wick",
              src: ".../../../../../images/users/avatar2.jpg",
            },
            {
              id: 3,
              name: "Sara Grealish",
              src: ".../../../../../images/users/avatar11.png",
            },
          ],
        },
        {
          id: 9,
          name: "RAMBO",
          src: ".../../../../../images/brands/brand8.png",
          users: [
            {
              id: 1,
              name: "Jack Grealish ",
              src: ".../../../../../images/users/avatar1.jpg",
            },
            {
              id: 2,
              name: "Jan Wick",
              src: ".../../../../../images/users/avatar2.jpg",
            },
            {
              id: 3,
              name: "Sara Grealish",
              src: ".../../../../../images/users/avatar11.png",
            },
          ],
        },
        {
          id: 10,
          name: "ORBIT",
          src: ".../../../../../images/brands/brand4.png",
          users: [
            {
              id: 1,
              name: "Jack Grealish ",
              src: ".../../../../../images/users/avatar4.jpg",
            },
            {
              id: 2,
              name: "Jan Wick",
              src: ".../../../../../images/users/avatar2.jpg",
            },
            {
              id: 3,
              name: "Sara Grealish",
              src: ".../../../../../images/users/avatar11.png",
            },
          ],
        },
        {
          id: 11,
          name: "LONGI",
          src: ".../../../../../images/brands/brand8.png",
          users: [
            {
              id: 1,
              name: "Jack Grealish ",
              src: ".../../../../../images/users/avatar1.jpg",
            },
            {
              id: 2,
              name: "Jan Wick",
              src: ".../../../../../images/users/avatar2.jpg",
            },
            {
              id: 3,
              name: "Sara Grealish",
              src: ".../../../../../images/users/avatar11.png",
            },
          ],
        },
        {
          id: 12,
          name: "EXIDE",
          src: ".../../../../../images/brands/brand4.png",
          users: [
            {
              id: 1,
              name: "Jack Grealish ",
              src: ".../../../../../images/users/avatar1.jpg",
            },
            {
              id: 2,
              name: "Jan Wick",
              src: ".../../../../../images/users/avatar2.jpg",
            },
            {
              id: 3,
              name: "Sara Grealish",
              src: ".../../../../../images/users/avatar11.png",
            },
          ],
        },
      ],
    },
  ];
  let brands = departments[0].brands;
  let arrayPos = [
    {
      id: 1,
      name: "PO 213",
      isSelected: false,
    },
    {
      id: 2,
      name: "PO 214",
      isSelected: false,
    },
    {
      id: 3,
      name: "PO 215",
      isSelected: false,
    },
    {
      id: 4,
      name: "PO 216",
      isSelected: false,
    },
    {
      id: 5,
      name: "PO 217",
      isSelected: false,
    },
    {
      id: 6,
      name: "PO 218",
      isSelected: false,
    },
    {
      id: 7,
      name: "PO 219",
      isSelected: false,
    },
    {
      id: 8,
      name: "PO 220",
      isSelected: false,
    },
  ];
  let comapnies = [
    {
      id: 1,
      name: "Azal",
      isSelected: false,
    },
    {
      id: 2,
      name: "Forwarder",
      isSelected: false,
    },
    {
      id: 3,
      name: "Bla Blue",
      isSelected: false,
    },
    {
      id: 4,
      name: "Blue Logistic",
      isSelected: false,
    },
  ];
  let viewFiles = [];
  return (
    <div className="container shared">
      <div className="card">
        <div class="card-header">
          <div class="tittle-card">
            <p> Add Expense </p>
          </div>
        </div>
        <div className="card-body">
          {/* Supplier section */}
          <div class="brands-section">
            <fieldset class="checkbox-group">
              <div class="col-12 tittle-section">
                <p>Choose Supplier</p>
              </div>
              {brands.map((brand, index) => (
                <div class="checkbox">
                  <label class="checkbox-wrapper">
                    <input type="radio" class="checkbox-input" name="supplier" id="supplier_id" />
                    <span class="checkbox-tittle">
                      <span class="checkbox-icon">
                        <img src={brand.src} alt="{brand.name}-img" />
                      </span>
                      <span class="checkbox-label">{brand.name}</span>
                    </span>
                  </label>
                </div>
              ))}
              {brands.length <= 0 && (
                <div class="empty-img">
                  <img src="../../../../../images/brands/brand4.png" alt="empty-img" />
                  <span>No Brands Available Yet! </span>
                </div>
              )}
            </fieldset>
          </div>
          {/* Order Purchase Section */}
          <div class="brands-section order-purchase-section">
            <fieldset class="checkbox-group">
              <div class="col-12 tittle-section">
                <p>Purchase Order</p>
              </div>
              {arrayPos.map((item, index) => (
                <div class="checkbox">
                  <label class="checkbox-wrapper">
                    <input type="radio" class="checkbox-input" name="purchaseOrder" id="purchaseOrder_id" />
                    <span class="checkbox-tittle">
                      <span class="checkbox-label">{item.name}</span>
                    </span>
                  </label>
                </div>
              ))}
              {arrayPos.length <= 0 && (
                <div class="empty-img">
                  <img src="../../../../../images/brands/brand4.png" alt="empty-img" />
                  <span>No POS Available Yet! </span>
                </div>
              )}
            </fieldset>
          </div>
          {/* Order Purchase Section */}
          <div class="brands-section order-purchase-section companies-section">
            <fieldset class="checkbox-group">
              <div class="col-12 tittle-section">
                <p>For Company</p>
              </div>
              {comapnies.map((item, index) => (
                <div class="checkbox">
                  <label class="checkbox-wrapper">
                    <input type="radio" class="checkbox-input" name="company" id="company_id" />
                    <span class="checkbox-tittle">
                      <span class="checkbox-label">{item.name}</span>
                    </span>
                  </label>
                </div>
              ))}
              {arrayPos.length <= 0 && (
                <div class="empty-img">
                  <img src="../../../../../images/brands/brand4.png" alt="empty-img" />
                  <span>No Comapnies Available Yet! </span>
                </div>
              )}
            </fieldset>
          </div>
          <div>
            <div class="tittle-section">
              <p>Additional Information</p>
            </div>
            <div className="additional-info">
              <div className="row">
                <div className="col-lg-3 col-md-12 mt-3">
                  <div class="text-center">
                    <div className="ngx-file-drop__drop-zone ">
                      <div className="ngx-file-drop__content pt-0">
                        <i class="uil uil-cloud-upload"></i>
                        <div className="text-center">
                          <button type="button">Select</button>
                        </div>
                        <strong>Upload document for paying case</strong>
                      </div>
                    </div>
                    {viewFiles.length <= 0 && (
                      <div className="empty-img">
                        <img src="../../../../../images/Empty.png" class="w-25" alt="Empty-photo" />
                        <p class="text-secondary mb-0">No files selected</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-lg-6 col-md-12">
                  <div class="service">
                    <span>Services to be paid</span>
                    {/* <select  className='form-control'>
                      <option>option #1</option>
                      <option>option #2</option>
                      <option>option #3</option>
                    </select>  */}
                    <select class="form-select" aria-label="Default select example">
                      <option selected>Open this select menu</option>
                      <option value="1">option #1</option>
                      <option value="2">option #2</option>
                      <option value="3">option #3</option>
                    </select>
                    <input type="text" className="form-control" placeholder="or Custom" />
                  </div>
                  <div class="service">
                    <span>Currency</span>
                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                      <FormControlLabel value="USD" control={<Radio />} label="USD" />
                      <FormControlLabel value="AED" control={<Radio />} label="AED" />
                      <FormControlLabel value="NBD" control={<Radio />} label="NBD" />
                    </RadioGroup>
                    <input type="text" className="form-control" placeholder="Amount" />
                  </div>
                  <div class="currency">
                    <span>Upload special Documents</span>
                    <div className="special-documents">
                      <i class="uil uil-file-plus-alt"></i>
                      <i class="uil uil-file-plus-alt"></i>
                      <i class="uil uil-file-plus-alt"></i>
                    </div>
                  </div>
                  <div className="details">
                    <textarea name="details" id="details_id" cols="30" rows="4" placeholder="Details:"></textarea>
                  </div>
                </div>
                <div className="col-lg-3 col-md-12">
                  <h6> Check PO Files</h6>
                  <div className="documents-info">
                    <div className="document-item">
                      <i class="uil uil-file-check-alt"></i>
                      <i class="uil uil-file-check-alt"></i>
                      <i class="uil uil-file-check-alt"></i>
                    </div>
                    <div className="document-item">
                      <strong>Last payment made</strong>
                      <span>3/4/2023</span>
                    </div>
                    <div className="document-item">
                      <strong>Advised closing full account before</strong>
                      <span>7/3/2023</span>
                    </div>
                    <div className="document-item">
                      <strong>Logistic Details</strong>
                      <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum aliquid officiis provident</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="buttons-group">
              <button class="ags-btn-main-fill" disabled={true}>
                <span>Submit Payment Order</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
