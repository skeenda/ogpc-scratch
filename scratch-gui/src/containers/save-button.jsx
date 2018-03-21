import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import ReactModal from 'react-modal';
import ButtonComponent from '../components/button/button.jsx';
import {ComingSoonTooltip} from '../components/coming-soon/coming-soon.jsx';
import styles from '../components/feedback-form/feedback-form.css';
import Box from '../components/box/box.jsx';
import html2canvas from 'html2canvas';
import toolbox from '../reducers/toolbox'
import makeToolboxXML from '../lib/make-toolbox-xml';
import $ from 'jquery';
import cat from '../spriteTest/cat.png';

class Popup extends React.Component {
    render() {
        return (
            <ReactModal
                isOpen
                className={styles.modalContent}
                overlayClassName={styles.modalOverlay}
                onRequestClose={this.props.closePopup}
            >   
                <Box className={styles.body}>
                    <form className={styles.body}> 
                        <label> Project Name: </label>
                        <input type='text' id='projectName' maxLength='20'/> 
                        <br/>
                        <label> Your Name (First and Last): </label>
                        <input type='text' id='projectAuthor' maxLength='20'/>
                        <br />
                        <label> Project Description: </label>
                        <input type='textbox' id='projectDescription'/>  
                        <br />
                        <button onClick={this.props.handleClick}>Save me</button>
                    </form>
                </Box>
            </ReactModal>
        );
    }
}

class SaveButton extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClick', 'togglePopup'
        ]);
        this.state = {showPopup: false}
    }

    togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup
        });
      }

    wordFilter (str) {
        var reBadWords = /fuck|ass|shit|nigger|faggot/gi;
        return str.replace(reBadWords, "*");       
    }

  
    toDataURL(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
          var reader = new FileReader();
          reader.onloadend = function() {
            callback(reader.result);
          }
          reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
      }

    handleClick () {

        //var cat = "../spriteTest/cat.png";

        /*
        html2canvas(document.getElementById("stagePic"), { background:'#ffffff', onrendered: function(canvas){
            var a = document.createElement('a');
            a.href = canvas.toDataURL("image/jpeg", 0.9).replace("image/jpeg", "image/octet-stream");
            a.download = 'snapshot.jpg'; 
            a.click(); 
        }});
        */
        /*
        html2canvas(document.getElementById("stagePic")).then(canvas => {
            document.body.appendChild(canvas)
        });


        var imageCan = document.getElementsByTagName("canvas")[0];

        var link  = document.createElement('a');
        link.setAttribute('download', 'MintyPaper.png');
        link.setAttribute('href', imageCan.toDataURL("image/png"));
        link.click();
        */
       
       // var image = imageCan.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
       // window.location.href = image;
        /*
        html2canvas(document.getElementById("stagePic"))
        .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        //const pdf = new jsPDF();
        //pdf.addImage(imgData, 'JPEG', 0, 0);
        // pdf.output('dataurlnewwindow');
        //pdf.save("download.pdf");
        var aLink = document.createElement('a');
        aLink.download = 'image.png';
        aLink.href = imgData;

        })
        ;
        */
        //window.open(canvas.toDataURL('image/png'));
        //var gh = canvas.toDataURL('png');

        //var a  = document.createElement('a');
        //a.href = gh;
        //a.download = 'image.png';

        //a.click()

        var projectName = document.getElementById('projectName').value.toString();
        const cleanName = this.wordFilter(projectName);

        var projectAuthor = document.getElementById('projectAuthor').value.toString();
        const cleanAuthor = this.wordFilter(projectAuthor);

        var projectDescription = document.getElementById('projectDescription').value.toString();
        const cleanDescription = this.wordFilter(projectDescription);
        var picString;
        const json = this.props.saveProjectSb3();
        this.toDataURL(cat, function(dataUrl) {
            console.log(dataUrl);
        // Download project data into a file - create link element,
        // simulate click on it, and then remove it.
            const saveLink = document.createElement('a');
            document.body.appendChild(saveLink);

            const dataJ = new Blob([json], {type: 'text'});
            const url = window.URL.createObjectURL(dataJ);
            saveLink.href = url;
            console.log(json);
            //console.log(json);
            $.ajax({
                url: "http://ogpc-kiosk.azurewebsites.net/Handler1.ashx",
                type:"POST",
                dataType: "json",
                data: {"projectname": `${cleanName}`, "projectfull": json, "projecdescription": `${cleanDescription}`, "projectauthor":`${cleanAuthor}`, "projectpic": dataUrl},            
                success: function (data) {
                    console.log("Successful post");
                },
                error: function (d) {
                    console.log(d.responseText);
                }
            });
  
        });
            

          
        //var link = document.createElement('a');
        //var a = $(link)
        //.attr("href", cat)
        //.attr("download", `${cleanName}_${cleanAuthor}_${cleanDescription}_${timestamp}.png`)
        //.appendTo("body");
        //a[0].click();
        //a.remove();

        /*
        
        const json = this.props.saveProjectSb3();
        // Download project data into a file - create link element,
        // simulate click on it, and then remove it.
        const saveLink = document.createElement('a');
        document.body.appendChild(saveLink);

        const dataJ = new Blob([json], {type: 'text'});
        const url = window.URL.createObjectURL(dataJ);
        saveLink.href = url;
        //console.log(json);
        $.ajax({
            url: "http://ogpc-kiosk.azurewebsites.net/Handler1.ashx",
            type:"POST",
            dataType: "json",
            data: {"projectname": "picstringtest", "projectfull": json, "projecdescription": "testDescription", "projectauthor":"Arya Asgariiii", "projectpic": picString},            
            success: function (data) {
                console.log("Successful post");
            },
            error: function (d) {
                console.log(d.responseText);
            }
        });
        
        // File name: project-DATE-TIME
        const date = new Date();
        const timestamp = `${date.toLocaleDateString()}-${date.toLocaleTimeString()}`;
        saveLink.download = `${cleanName}_${cleanAuthor}_${cleanDescription}_${timestamp}.json`;
        saveLink.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(saveLink);
        */
        this.togglePopup();
    }
    render () {
        const {
            saveProjectSb3, // eslint-disable-line no-unused-vars
            ...props
        } = this.props;
        return (
            <div>
                <ButtonComponent
                    //disabled
                    enabled
                    onClick={this.togglePopup}
                    {...props}
                >
                    Save
                </ButtonComponent>
                {this.state.showPopup ? 
                    <Popup
                      text='Close Me'
                      closePopup={this.togglePopup.bind(this)}
                      handleClick={this.handleClick.bind(this)}
                    />
                    : null
                  }
                </div>
        );
    }
}

SaveButton.propTypes = {
    saveProjectSb3: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    saveProjectSb3: state.vm.saveProjectSb3.bind(state.vm)
});

export default connect(
    mapStateToProps,
    () => ({}) // omit dispatch prop
)(SaveButton);
