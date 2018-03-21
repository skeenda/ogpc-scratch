import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import MediaQuery from 'react-responsive';
import {FormattedMessage} from 'react-intl';
import tabStyles from 'react-tabs/style/react-tabs.css';
import VM from 'scratch-vm';

import Blocks from '../../containers/blocks.jsx';
import CostumeTab from '../../containers/costume-tab.jsx';
import TargetPane from '../../containers/target-pane.jsx';
import SoundTab from '../../containers/sound-tab.jsx';
import StageHeader from '../../containers/stage-header.jsx';
import Stage from '../../containers/stage.jsx';

import Box from '../box/box.jsx';
import FeedbackForm from '../feedback-form/feedback-form.jsx';
import IconButton from '../icon-button/icon-button.jsx';
import MenuBar from '../menu-bar/menu-bar.jsx';
import PreviewModal from '../../containers/preview-modal.jsx';
import WebGlModal from '../../containers/webgl-modal.jsx';

import layout from '../../lib/layout-constants.js';
import styles from './gui.css';
import addExtensionIcon from './icon--extensions.svg';
import ScrollArea from 'react-scrollbar';

const addExtensionMessage = (
    <FormattedMessage
        defaultMessage="Extensions"
        description="Button to add an extension in the target pane"
        id="gui.gui.addExtension"
    />
);

const divStyle={
    overflowY: 'scroll',
    border: 'white',
    width:'700px',
    float: 'left',
    height:'550px',
    position:'relative'
  };

const canStyle={
    backgroundColor:'#ffffff'
};

const GUIComponent = props => {
    const {
        basePath,
        children,
        enableExtensions,
        feedbackFormVisible,
        vm,
        previewInfoVisible,
        onExtensionButtonClick,
        onTabSelect,
        tabIndex,
        ...componentProps
    } = props;
    if (children) {
        return (
            <Box {...componentProps}>
                {children}
            </Box>
        );
    }

    const tabClassNames = {
        tabs: styles.tabs,
        tab: classNames(tabStyles.reactTabsTab, styles.tab),
        tabList: classNames(tabStyles.reactTabsTabList, styles.tabList),
        tabPanel: classNames(tabStyles.reactTabsTabPanel, styles.tabPanel),
        tabPanelSelected: classNames(tabStyles.reactTabsTabPanelSelected, styles.isSelected),
        tabSelected: classNames(tabStyles.reactTabsTabSelected, styles.isSelected)
    };

    return (
        <Box
            className={styles.pageWrapper}
            {...componentProps}
        >
            {previewInfoVisible ? (
                <PreviewModal />
            ) : null}
            {feedbackFormVisible ? (
                <FeedbackForm />
            ) : null}
            {(window.WebGLRenderingContext) ? null : (<WebGlModal />)}
            
            <MenuBar />
            
            <Box className={styles.bodyWrapper}>
                <Box className={styles.flexWrapper}>
                    <Box className={styles.editorWrapper}>
                        <Tabs
                            className={tabClassNames.tabs}
                            forceRenderTabPanel={true} // eslint-disable-line react/jsx-boolean-value
                            selectedTabClassName={tabClassNames.tabSelected}
                            selectedTabPanelClassName={tabClassNames.tabPanelSelected}
                            onSelect={onTabSelect}
                        >
                            <TabList className={tabClassNames.tabList}>
                                <Tab className={tabClassNames.tab}>Blocks</Tab>
                                <Tab className={tabClassNames.tab}>Costumes</Tab>
                                <Tab className={tabClassNames.tab}>Sounds</Tab>
                                <Tab className={tabClassNames.tab}>Help</Tab>
                            </TabList>
                            <TabPanel className={tabClassNames.tabPanel}>
                                <Box className={styles.blocksWrapper}>
                                    <Blocks
                                        grow={1}
                                        isVisible={tabIndex === 0} // Blocks tab
                                        options={{
                                            media: `${basePath}static/blocks-media/`
                                        }}
                                        vm={vm}
                                    />
                                </Box>
                                <Box className={styles.extensionButtonContainer}>
                                    <IconButton
                                        className={classNames(styles.extensionButton, {
                                            [styles.hidden]: !enableExtensions
                                        })}
                                        img={addExtensionIcon}
                                        title={addExtensionMessage}
                                        onClick={onExtensionButtonClick}
                                    />
                                </Box>
                            </TabPanel>
                            <TabPanel className={tabClassNames.tabPanel}>
                                {tabIndex === 1 ? <CostumeTab vm={vm} /> : null}
                            </TabPanel>
                            <TabPanel className={tabClassNames.tabPanel}>
                                {tabIndex === 2 ? <SoundTab vm={vm} /> : null}
                            </TabPanel>
                            <TabPanel className={tabClassNames.tabPanel}>
                                <div style={divStyle}>                                
                                    <h1> Motion </h1>
                                        <h3> Move x </h3> 
                                            <p>Move a certain number of steps </p>
                                        <h3> Go to: x y </h3>
                                            <p> Go to this position on the stage </p>
                                        <h3> Go to: position </h3> 
                                            <p>Move the sprite to a new location </p>
                                        <h3> Glide 1 sec to x, y </h3>
                                            <p> Glide to those coordinates over a certain period of time  </p>
                                        <h3> Glide 1 sec to position </h3>
                                            <p> Glide to a position over a certain period of time </p> 
                                        <h3> Turn (right)</h3>
                                            <p> Turn to the right </p>  
                                        <h3> Turn (left)</h3>
                                            <p> Turn to the left </p> 
                                        <h3>Point in direction</h3>
                                            <p> Set the direction of the current sprite </p> 
                                        <h3> Point towards</h3>
                                            <p>Points sprite towards mouse-pointer or another sprite</p>
                                        <h3>change x by </h3>
                                            <p>Change the x position by this amount</p>               
                                        <h3>set x to</h3>
                                            <p>Set this x coordinate to this number </p>
                                        <h3>change y by </h3>
                                            <p>Change the y position by this amount </p>               
                                        <h3>set y to</h3>
                                            <p>Set the Y coordinate to this number </p>
                                         <h3> If on edge, bounce </h3>
                                            <p> If touching the edge of the stage, then bounce away </p>
                                        <h3>Set rotation style</h3>
                                            <p>Set the rotation style of the sprite</p>
                                        <h3> X position, Y position, Direction </h3> 
                                            <p> Report the current x, y, or direction of the sprite </p>
                    
                                   <h1> Looks </h1>
                                        <h3> Say _ for _ seconds</h3> 
                                            <p> Say words in a speech bubble for a number of seconds </p>
                                        <h3> Say _</h3>
                                            <p> Say words in a speech bubble </p>
                                        <h3> Think _ for _ seconds </h3>
                                            <p> Display words in a thought bubble for a number of seconds</p>   
                                        <h3>Think _  </h3>
                                            <p> Display words in a thought bubble </p>   
                                        <h3> Switch costume to _ </h3>
                                            <p> Switch costumes to change the look of the sprite</p>   
                                        <h3>Next costume </h3>
                                            <p>Switches to the next cosetume in the sprite's costume list </p>  
                                        <h3> Switch backdrop to _ </h3>
                                            <p>Switch to the specified backdrop </p>   
                                        <h3>Next backdrop </h3> 
                                            <p> Switches to the next backdrop in the stage's backdrop list</p>
                                        <h3> Change size by _ </h3>
                                            <p> Changes sprite's size by a specified amount</p>
                                        <h3> Set size to _ %</h3>
                                            <p> Sets sprite's size to specified % of original size</p>
                                        <h3> Change _ effect by _ </h3>
                                            <p> Changes the graphic effect on a sprite </p>
                                        <h3> Set _ effect to _ </h3>
                                            <p>Sets the graphic effect of a sprite to a specific number </p>
                                        <h3> Clear graphic effects</h3>
                                            <p> Clears all graphic effects for a sprite </p>
                                        <h3> Show </h3>
                                            <p> Makes sprite appear on the Stage</p>
                                        <h3> Hide  </h3>
                                            <p> Makes sprite disappear from the Stage</p>
                                        <h3> Go to front  </h3>
                                            <p> Moves sprite in front of all other sprites </p>
                                        <h3>Go forward/backward _ layers </h3>
                                            <p>Go back/forward a certain number of layers</p>
                                        <h3> Costume name/number </h3>
                                            <p> Reports sprite's current costume number </p>
                                        <h3> Backdrop name/number </h3>
                                            <p> Reports Stage's current backdrop name/number</p>
                                        <h3> Size </h3>
                                            <p> Reports sprite's size, as % of original size</p>
                                    <h1> Sound </h1>
                                        <h3> Start sound</h3>
                                            <p> Plays a sound</p> 
                                        <h3> Play sound _ until done</h3>
                                            <p> Plays a sound and waits until the sound is finished</p> 
                                       <h3> Stop all sounds  </h3>
                                            <p>Stops all sounds </p> 
                                        <h3> Change _ effect by _ </h3>
                                            <p> Changes a sound with that effect by that value </p> 
                                        <h3> Set _ effect to _</h3>
                                            <p> Sets a sound effect to that value  </p> 
                                        <h3> Clear all sound effects </h3>
                                            <p> Clear all sound effects </p> 
                                        <h3> Change volume by _ </h3>
                                            <p> Changes sprite's sound volume by specified amount</p> 
                                        <h3> Set volume to _ %</h3>
                                            <p> Set the volume (percentage) </p> 
                                        <h3> Volume </h3>
                                            <p> Report the current Volume </p> 
                                    <h1> Events </h1>
                                        <h3> When green flag clicked </h3> 
                                            <p>Runs the script when the green flag is clicked </p> 
                                        <h3> When _ key is pressed</h3>
                                            <p> Runs a script when a specified key is pressed</p>
                                        <h3>When this sprite clicked </h3>
                                            <p> Runs the script when this sprite is clicked  </p>
                                        <h3> When backdrop switches to _</h3>
                                            <p> Runs a script when the backdrop is switched to the specified backdrop</p>
                                        <h3> When loudness/timer/videomotion > _</h3>
                                            <p> Runs a script when the selected attribute (loudness, timer, video motion) is greater than a specified value </p>
                                        <h3> When I receive _  </h3>
                                            <p> Runs script below when it receives specified broadcast message</p>
                                        <h3> Broadcast _ </h3> 
                                            <p> Sends a message to all sprites </p> 
                                        <h3> Broadcast _ and wait </h3> 
                                            <p> Sends a message to all sprites and waits </p> 
                                    <h1> Control </h1>
                                        <h3>Wait _ Seconds</h3>
                                            <p> Waits specified number of seconds, then continues with next block</p>
                                        <h3> Repeat _ </h3>
                                            <p>Runs the blocks inside a specified number of times </p> 
                                        <h3> Forever </h3>
                                            <p> Runs the blocks inside over and over</p> 
                                        <h3> If _ Then  </h3>
                                            <p>If condition is true, runs the blocks inside </p> 
                                        <h3>If _ Then, Else </h3>
                                            <p> If condition is true, runs the blocks inside the if portion; if not, runs the blocks inside the else portion</p> 
                                        <h3> Wait until _ </h3>
                                            <p> Waits until condition is true, then runs the blocks below</p> 
                                        <h3> Repeat Until _ </h3>
                                            <p> Repeat blocks that follow until condition is true</p> 
                                        <h3> Stop all/this script/other scripts in sprite</h3>
                                            <p> Stops all scripts in all sprites</p> 
                                        <h3> When I starts as a clone </h3>
                                            <p>Tells a clone what to do once it is created </p> 
                                        <h3> Create clone of _ </h3>
                                            <p>Creates a clone (temporary duplicate) of the specified sprite </p> 
                                        <h3> Delete this clone </h3>
                                            <p> Deletes the current clone</p> 
                                    
                                    <h1> Sensing </h1>
                                        <h3> Touching _  </h3>
                                            <p>Reports true if sprite is touching specified sprite, edge, or mouse-pointer </p>
                                        <h3> Touching Color _  </h3>
                                            <p> Reports true if sprite is touching specified color</p>
                                        <h3> Color _ is touching _  </h3>
                                            <p> Reports true if first color is touching second color</p>
                                        <h3> Distance to _ </h3>
                                            <p> Reports distance from the specified sprite or mouse-pointer</p>
                                        <h3> Ask _ and wait </h3>
                                            <p>Asks a question on the screen and stores keyboard input in the answer block</p>
                                        <h3> Answer</h3>
                                            <p> Reports keyboard input from the most recent use of ask and wait block </p>
                                        <h3> Key _ pressed ?  </h3>
                                            <p> Reports true if specified key is pressed</p>
                                        <h3> Mouse down? </h3>
                                            <p> Reports true if mouse button is pressed</p>
                                        <h3> Mouse X </h3>
                                            <p> Reports the x-position of mouse-pointer</p>
                                        <h3> Mouse Y</h3>
                                            <p> Reports the x-position of mouse-pointer</p>
                                        <h3> Set Drag mode (draggable/not draggable) </h3>
                                            <p>Set an object to either be draggable or not</p>
                                        <h3> Loudness </h3>
                                            <p> Reports the volume (from 1 to 100) of sounds detected by the computer microphone</p>
                                        <h3> Timer </h3>
                                            <p> Reports the value of the timer in seconds</p>
                                        <h3> Reset timer</h3>
                                            <p> Sets the timer to zero</p>
                                        <h3> _ of Stage </h3>
                                            <p> Reports an attribute of the sprite or stage</p>
                                        <h3>Current (year/day/month)</h3>
                                            <p> Reports the current time</p>
                                        <h3> Days since 2000 </h3>
                                            <p> Reports the number of days since 200</p> 
                                    <h1> Operators </h1>
                                        <h3> +</h3>
                                            <p> Add two numbers</p>
                                        <h3> - </h3>
                                            <p> Subtract two numbers</p>
                                        <h3> * </h3>
                                            <p> Multiply two numbers</p>
                                        <h3> / </h3>
                                            <p> Divide two numbers</p>
                                        <h3> Pick random _ to _ </h3>
                                            <p>Pick a random number in the given range </p>
                                        <h3> &lt; </h3>
                                            <p> Reports true if first value is less than second</p>
                                        <h3> = </h3>
                                            <p> Reports true if two values are equal </p>
                                        <h3> &gt; </h3>
                                            <p> Reports true if first value is greater than second </p>
                                        <h3> and </h3>
                                            <p> Reports true if both conditions are true</p>
                                        <h3> or </h3>
                                            <p> Reports true if either condition is true</p>
                                        <h3> not </h3>
                                            <p> Reports true if condition is false; reports false if condition is true</p>
                                        <h3> join _ _ </h3>
                                            <p> Concatenates (combines) strings</p>
                                        <h3> letter _ of _ </h3>
                                            <p> Reports the letter at the specified position in a string</p>
                                        <h3> length of _ </h3>
                                            <p> Reports the number of letters in a string</p>
                                        <h3> _ contains _ ?</h3>
                                            <p> Reports true if the second string contains the first string</p>
                                        <h3> _ mod _ </h3>
                                            <p> Reports remainder from division of first number by second number</p>
                                        <h3> round _ </h3>
                                            <p> Reports closest integer to a number</p>
                                        <h3> _ of _ </h3>
                                            <p> Computes a function</p>
                                    <h1> Variables </h1>
                                        <h3> Make a variable </h3>
                                            <p> Make your own variable</p>
                                        <h3> Make a list </h3>
                                            <p> Make your own list </p>
                                    <h1> My Blocks </h1>
                                        <h3> Make a Block </h3>
                                            <p> Make your own block </p>
                                        
                                </div>
                            </TabPanel>
                        </Tabs>
                    </Box>
                    
                    <Box className={styles.stageAndTargetWrapper}>
                        <Box className={styles.stageMenuWrapper}>
                            <StageHeader vm={vm} />
                        </Box>
                        
                        <Box className={styles.stageWrapper}>
                            <MediaQuery minWidth={layout.fullSizeMinWidth}>{isFullSize => (
                                <Stage
                                    height={isFullSize ? layout.fullStageHeight : layout.smallerStageHeight}
                                    shrink={0}
                                    vm={vm}
                                    width={isFullSize ? layout.fullStageWidth : layout.smallerStageWidth}
                                />
                            )}</MediaQuery>
                        </Box>
                       
                        <Box className={styles.targetWrapper}>
                            <TargetPane
                                vm={vm}
                            />
                        </Box>
                    </Box>
                    
                </Box>
                
            </Box>
            
        </Box>
    );
};
GUIComponent.propTypes = {
    basePath: PropTypes.string,
    children: PropTypes.node,
    enableExtensions: PropTypes.bool,
    feedbackFormVisible: PropTypes.bool,
    onExtensionButtonClick: PropTypes.func,
    onTabSelect: PropTypes.func,
    previewInfoVisible: PropTypes.bool,
    tabIndex: PropTypes.number,
    vm: PropTypes.instanceOf(VM).isRequired
};
GUIComponent.defaultProps = {
    basePath: './'
};
export default GUIComponent;
