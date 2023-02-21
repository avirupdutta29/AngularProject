
import { Component, OnInit, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import * as $ from "jquery";
import { faMicrophoneSlash, faPhoneSlash, faMicrophone, faVideoSlash, faVideo, faFilm, faTableCellsLarge, faLock, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
//import {MatDialog, MatDialogConfig} from "@angular/material"

declare var JitsiMeetExternalAPI: any;

library.add(fas);

@Component({
    selector: 'app-jitsi',
    templateUrl: './jitsi.component.html',
    styleUrls: ['./jitsi.component.css']
})





export class JitsiComponent  {

    faPhoneSlash=faPhoneSlash;
    faMicrophoneSlash=faMicrophoneSlash;
    faMicrophone=faMicrophone;
    faVideoSlash=faVideoSlash;
    faVideo=faVideo;
    faFilm=faFilm;
    
    faTableCellsLarge=faTableCellsLarge;
    faLock=faLock;
    faCircleXmark=faCircleXmark;

    domain: string="jitsi.test.com";
    room: any;
    user: any;
    api: any;
    options: any;
    apiObj: any
    
    
    isAudioMuted= false;
    isVideoMuted= false;
    participantRoleChanged: any;


    // showForm() {

    //     console.log("Hello World");

    //     document.getElementById('formElement');
        
    // }


   

   
    
    constructor(
        private router: Router ,
        
    ){}


   

    
        ngOnInit(): void {


            $(function(){
                

                $('#btnStart').on('click',function(){
                    var meetingId = $('#txtMeetingId').val();
                    var dispNme = $('#txtDispNme').val();
                    StartMeeting(meetingId,dispNme);
                });
            });
        // this.room = meetingId; // set your room name
        //  console.log(this.room);
        // this.user = {
        //     name: dispNme // set your username
        // }

        // console.log(this.user)
    }


    // onClick(){

    //     var meetingId = $('#txtMeetingId').val();
    //     var dispNme = $('#txtDispNme').val();
    //     console.log(meetingId);
    //     console.log(dispNme);
    //     StartMeeting(meetingId,dispNme);

    // }


    // StartMeeting(meetingId: any,dispNme: any){

    //     console.log(meetingId)
    //     console.log(dispNme)
    // }




    
    // name = 'Angular';
    // isClicked=false;
    // OnClick(){
    //   this.isClicked=true;
    // }



    // showTextBox: boolean = false;

    // toggleTextBox() {
    // this.showTextBox = !this.showTextBox; 
    // }


   


    // myFunc(placeId: any) {
    //     console.log(placeId);
    // }

     
    StartMeeting(){
        
       
        var meetingId = $('#txtMeetingId').val();
        var dispNme = $('#txtDispNme').val();
        console.log(meetingId);
        console.log(dispNme);
        console.log(this.user);

        

        


        //var pass = 'root@123';
        
        this.options = {
             
            roomName: meetingId,                                    //The name of the room to join.
            width: 650,                                            //The created IFrame width.
            height:500,                                            //The height for the created IFrame.
            
            
           
            DEFAULT_REMOTE_DISPLAY_NAME:'New_User',
            configOverwrite: {proJoinPageEnable: false,
                              startWithAudioMuted: true,
                              doNotStoreRoom: true,
                              startVideoMuted: 0,
                              startWithVideoMuted: true, 
                              enableWelcomePage: false,
                              prejoinPageEnabled: false,
                              disableRemoteMute: true,
                              remoteVideoMenu: {
                                  disableKick: true
                              },
                          },         //The JS object with overrides for options defined in the config.js file.
            interfaceConfigOverWrite: {
                TILE_VIEW_MAX_COLUMN: 8,
                DISABLE_DOMINANT_SPEAKER_INDICATOR: true,
                DEFAULT_LOGO_URL: 'images/eXzaTech-Transparent_White.png',
                filmStripOnly: false,
                DISPLAY_WELCOME_PAGE_CONTENT: false,
                SHOW_JITSI_WATERMARK: false,
                SHOW_WATERMARK_FOR_GUESTS: false,
                DEFAULT_REMOTE_DISPLAY_NAME: 'New User',
                //TOOLBAR_BUTTONS: []
            }, 
            parentNode: document.querySelector('#jitsi-iframe'),   //HTML DOM element where IFRAME  is added as a child
            userInfo : {
                //displayName:this.user.name,
                displayName:dispNme,
                email: 'avirup@exzatechconsulting.com',
                moderator: true
            },
            onload: function () {
                //alert('loaded');
                $('#toolbox').show();
            }

            
         };
         
        console.log(this.options.roomName);
        this.api= new JitsiMeetExternalAPI(this.domain, this.options); 
         
        // onCreate(){
            
        // }

        
    
      


        var pass = 'your-room-password';


        this.api.addEventListener('participantRoleChanged', (event: { role: string; }) => {
            // when host has joined the video conference 
            if (event.role == 'moderator') {
                this.api.executeCommand('password', pass);
            }

            else {
                setTimeout(() => {
                // why timeout: I got some trouble calling event listeners without setting a timeout :)

                    // when local user is trying to enter in a locked room 
                    this.api.addEventListener('passwordRequired', () => {
                        this.api.executeCommand('password', pass);
                    });

                    // when local user has joined the video conference 
                    this.api.addEventListener('videoConferenceJoined', (response: any) => {
                        setTimeout(() =>{ this.api.executeCommand('password', pass);}, 300);
                    });

                }, 10);
            }
        });


 
     
    // when local user is trying to enter in a locked room
    // this.api.addEventListener('passwordRequired', () => {
    //     console.log("hello2")
    //     this.api.executeCommand('password', pass);
    // });

    // // when local user has joined the video conference
    // this.api.addEventListener('videoConferenceJoined', (response: any) => {
    //     this.api.executeCommand('password', pass);
    // });



      

    
        

    //     this.api.addEventListners('participantRoleChanged',(event: any) => {
    //         console.log(event.role);

    //         // when host has joined the video conference 
    //         if (event.role == 'moderator') {
    //             this.api.executeCommand('password', pass);
    //         }
    //         else {
    //             setTimeout(() => {
    //             // why timeout: I got some trouble calling event listeners without setting a timeout :)

    //                 // when local user is trying to enter in a locked room 
    //                 this.api.addEventListener('passwordRequired', () => {
    //                     this.api.executeCommand('password', pass);
    //                 });

    //                 // when local user has joined the video conference 
    //                 this.api.addEventListener('videoConferenceJoined', (response: any) => {
    //                     setTimeout(() =>{ this.api.executeCommand('password', pass);}, 300);
    //                 });

    //             }, 10);
    //         }
        
    // })
 

  // readyToClose: function () {
            //     //alert('going to close');
            //     $('#jitsi-meet-conf-container').empty();
            //     $('#toolbox').hide();
            // },
            // audioMuteStatusChanged: function (data: { muted: any; }) {
            //     if(data.muted)
            //         $("#btnCustomMic").text('Unmute');
            //     else
            //         $("#btnCustomMic").text('Mute');
            // },
            // //videoConferenceJoined: videoConferenceJoiningListener,
            // videoMuteStatusChanged: function (data: { muted: any; }) {
            //     if(data.muted)
            //         $("#btnCustomCamera").text('Start Cam');
            //     else
            //         $("#btnCustomCamera").text('Stop Cam');
            // },
            
            // participantRoleChanged: function(event: { role: string; }){


            //     console.log(event.role);
            //     if(event.role=='moderator'){
            //        this.api.executeCommand('password',this.password);
            //     }
            // },
            // tileViewChanged: function (data: any) {
                
            // },
            // screenSharingStatusChanged: function (data: { on: any; }) {
            //     if(data.on)
            //         $("#btnScreenShareCustom").text('Stop SS');
            //     else
            //         $("#btnScreenShareCustom").text('Start SS');
            // },
            // participantJoined: function(data: any){
            //     console.log('participantJoined', data);
            // },
            // participantLeft: function(data: any){
            //     console.log('participantLeft', data);
            // },

           // participantRoleStatusChanged:this.participantRoleChanged()
    //set new password for channel
    // this.api.addEventListener('participantRoleChanged', (event: { role: string; }) => {
    //     if (event.role === "moderator") {
    //         this.api.executeCommand('password', 'arjuna@123');
    //     }
    // });
    // join a protected channel
//     this.api.on('passwordRequired',  () =>
// {
//     this.api.executeCommand('password', 'arjuna@123');
// });


    
  this.participantRoleChanged= async (event:  { role: string; })=> {
    if (event.role === "moderator") {
        this.api.executeCommand('password', 'root@123');
    }
    
  }
       this.api.executeCommand('subject', 'New Room 2');
  
  
 }


  


  

  executeCommand(command: string) {
    
    this.api.executeCommand(command);
    
    if(command =='hangup'){
        this.api.executeCommand('hangup');
    }
   if(command=='toggleAudio'){
        //  this.api.executeCommand('toggleAudio');
        this.isAudioMuted = !this.isAudioMuted;
   }
    if(command=='toggleVideo'){
        // this.api.executeCommand('toggleVideo');
        this.isVideoMuted = !this.isVideoMuted;

    }
    if(command=='toggleShareScreen'){
        this.api.executeCommand('toggleShareScreen');
    }
    if(command=='toggleTileView'){
        this.api.executeCommand('toggleTileView');
    }

   
    this.participantRoleChanged= async (event: any) => {
        console.log(event.role);
    if (event.role === "moderator") {
        this.api.executeCommand('password', 'The Password');
    }
  }
}

}


function StartMeeting(meetingId: string | number | string[] | undefined, dispNme: string | number | string[] | undefined) {
    throw new Error('Function not implemented.');
}

function meetingId(meetingId: any, dispNme: any) {
    throw new Error('Function not implemented.');
}

function dispNme(meetingId: (meetingId: any, dispNme: any) => void, dispNme: any) {
    throw new Error('Function not implemented.');
}

function myFunc(num1: any) {
    throw new Error('Function not implemented.');
}

function num1(num1: any) {
    throw new Error('Function not implemented.');
}

function showForm() {
    throw new Error('Function not implemented.');
}

function onCreate() {
    throw new Error('Function not implemented.');
}
    // handleClose=() => {

    //     console.log("HandleClose");
    // }

    // handleParticipantLeft = asyc (participant : any)=> {

    //     const data= await this.getParticipants()

    // }

    // handleParticipantJoined = async (participant : any) => { 
        
    //     const data= await this.getParticipants()

    // }

    // videoConferenceJoined = async (participant : any) => {

    //     const data= await this.getParticipants()

    // }

    // videoconferenceLeft =  () => { 

    //     this.router.navigate(['/'])

    // }

    // handleMutedStatus = (audio: any) => {

    //     console.log("HandleMutedStatus", audio)

    // }

    // handleVideoStatus = (video : any) => {
        
    //     console.log("VideoMutedStatus", video)
    // }

    // getParticipants(){

    //     return new Promise ((resolve, reject) => {

    //         setTimeout(()=>{
    //             resolve(this.api.getParticipantsInfo())
    //         },500)
            
    //     })
    // }

    // executeCommand(command: string){
    //     this.api.executeCommand(command);
    //     if(command=='hangup'){
    //         this.router.navigate(['/thank-you'])
    //         return;
    //     }

    //     if(command=='toggleAudio'){
    //         this.isAudioMuted= !this.isAudioMuted;
    //     }

    //     if(command=='toggleVideo'){
    //         this.isVideoMuted= !this.isVideoMuted;
    //     }

    //     $("#btnCustomTileView").on('click', function () {
    //         this.api.executeCommand('toggleTileView');
    //     });
    //     $("#btnScreenShareCustom").on('click', function () {
    //         this.api.executeCommand('toggleShareScreen');
    //     });
    // }



