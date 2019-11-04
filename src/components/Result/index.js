import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './styles.css'

const apiUrl = 'https://my12.digitalexperience.ibm.com/api'

const Result = ({jsonValue, history}) => {
  const [isLeadImageVisible, setIsLeadImageVisible] = useState(true)
  const [isProfileLeadImageVisible, setIsProfileLeadImageVisible] = useState(false)
  
  useEffect(() => {
    if(!jsonValue || !jsonValue.hasOwnProperty('name')) {
      history.push('/not-found')
    }
  }, [jsonValue]);
  
  const toggleLeadImage = () => setIsLeadImageVisible(!isLeadImageVisible)
  const toggleProfileLeadImage = () => setIsProfileLeadImageVisible(!isProfileLeadImageVisible)
  
  return !!jsonValue && jsonValue.hasOwnProperty('name') ? (
    <div className="Result-wrapper">
      <NavLink to='/input'>Input New URL</NavLink>
      <div className="Title-wrapper">
        <h1>Name: {jsonValue.elements.heading.value}</h1>
        <span>Status: {jsonValue.status}</span>
      </div>
      <div className="MainImage-wrapper">
        <div className="caption" onClick={toggleLeadImage}>
          <span>
            {
              isLeadImageVisible ? '-' : '+'
            }
          </span>
          &nbsp;
          <h4>Lead Image</h4>
        </div>
        {
          isLeadImageVisible && (
            <div className="MainImage-Data-container">
              <div className="MainImage-container">
                <div><span>Image: </span><a href={`${apiUrl}/${jsonValue.elements.mainImage.value.leadImage.url.split('/')[1]}/${jsonValue.elements.mainImage.value.leadImage.renditions.default.source}`}>{jsonValue.elements.mainImage.value.leadImage.asset.fileName}</a></div>
                <img
                  src={`${apiUrl}/${jsonValue.elements.mainImage.value.leadImage.url.split('/')[1]}/${jsonValue.elements.mainImage.value.leadImage.renditions.default.source}`}
                  alt={`${jsonValue.elements.mainImage.value.leadImage.asset.altText}|size=${jsonValue.elements.mainImage.value.leadImage.renditions.default.width}x${jsonValue.elements.mainImage.value.leadImage.renditions.default.height}`}
                />
              </div>
              <div className="ProfileImages-container">
                <div className="caption" onClick={toggleProfileLeadImage}>
                <span>
                  {
                    isProfileLeadImageVisible ? '-' : '+'
                  }
                </span>
                  &nbsp;
                  <h4>Profile for lead image</h4>
                </div>
                {
                  isProfileLeadImageVisible && (
                    <div className="OtherImages-container">
                      <div className="LeadImage-container">
                        <em>Lead</em>
                        <img
                          src={`${apiUrl}/${jsonValue.elements.mainImage.value.leadImage.url.split('/')[1]}/${jsonValue.elements.mainImage.value.leadImage.renditions.lead.source}`}
                          alt={`${jsonValue.elements.mainImage.value.leadImage.asset.altText}|size=${jsonValue.elements.mainImage.value.leadImage.renditions.lead.width}x${jsonValue.elements.mainImage.value.leadImage.renditions.lead.height}`}
                        />
                        <em>Dimentions: {jsonValue.elements.mainImage.value.leadImage.renditions.lead.width} x {jsonValue.elements.mainImage.value.leadImage.renditions.lead.height} pixels</em>
                      </div>
                      <div className="CardImage-container">
                        <em>Card</em>
                        <img
                          src={`${apiUrl}/${jsonValue.elements.mainImage.value.leadImage.url.split('/')[1]}/${jsonValue.elements.mainImage.value.leadImage.renditions.card.source}`}
                          alt={`${jsonValue.elements.mainImage.value.leadImage.asset.altText}|size=${jsonValue.elements.mainImage.value.leadImage.renditions.card.width}x${jsonValue.elements.mainImage.value.leadImage.renditions.card.height}`}
                        />
                        <em>Dimentions: {jsonValue.elements.mainImage.value.leadImage.renditions.card.width} x {jsonValue.elements.mainImage.value.leadImage.renditions.card.height} pixels</em>
                      </div>
                    </div>
                  )
                }
              </div>
            </div>
          )
        }
        <div className="MainImage-caption">
          <h4>Lead image caption: {jsonValue.elements.mainImage.value.leadImageCaption.value}</h4>
        </div>
        <div className="MainImage-credit">
          <h4>Lead image credit: {jsonValue.elements.mainImage.value.leadImageCredit.value}</h4>
        </div>
      </div>
      <div className="AuthorName-wrapper">
        <h3>Author's Name: {jsonValue.elements.author.value}</h3>
      </div>
      <div className="DateTime-wrapper">
        <h4>Date: </h4>
        <input type="date" defaultValue={jsonValue.lastModified.slice(0,10)}/>
        <input type="time" defaultValue={jsonValue.lastModified.slice(11,16)}/>
      </div>
      <div className="Body-wrapper">
        {
          jsonValue.elements.body.values.map((value,index) => (
            <div  key={`${value}-${index}`} className="CKEditor-wrapper">
              <CKEditor
                editor={ ClassicEditor }
                data={value}
              />
            </div>
          ))
        }
      </div>
    </div>
  ) : null
}

export default Result;