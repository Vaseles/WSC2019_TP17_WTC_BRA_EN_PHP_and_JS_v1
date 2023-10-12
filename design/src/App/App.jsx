import {useState} from 'react'
import styles from './App.module.css'

const App = () => {
    // Show all elements
    const [elements, setElements] = useState([
        {
            id: 1,
            title: '',
            place1: false, title1: '',
            place2: false, title2: '',
            place3: false, title3: '',
            place4: false, title4: '',
        }
    ])
    const [selectedElement, setSelectedElement] = useState(null)
    const [showSettings, setShowSettings] = useState(false)
    const [showPresentationMode, setShowPresentationMode] = useState(false)

    // clear presentation
    const clearPresentation = () => {
        setElements([
            {
                id: 1,
                title: '',
                place1: false, title1: '',
                place2: false, title2: '',
                place3: false, title3: '',
                place4: false, title4: '',
            }
        ])
    }

    // settings presentation
    const showSettingsFunc = (elem) => {
        setSelectedElement(elem)
        setShowSettings(!showSettings)
    }

    // delete an element
    const deleteElement = () => {
        setElements([])
        selectedElement(null)
    }

    // create a new element
    const crateANewElement = (elem, number) => {

        switch (number) {
            case 1:
                setElements(elements.map(element => 
                    element.id == elem.id? 
                    {...element, place1: !element.place1 } : element))
                break
            case 2:
                setElements(elements.map(element => 
                    element.id == elem.id? 
                    {...element, place2: !element.place2 } : element))
                break
            case 3:
                setElements(elements.map(element => 
                    element.id == elem.id? 
                    {...element, place3: !element.place3 } : element))
                break
            case 4:
                setElements(elements.map(element => 
                    element.id == elem.id? 
                    {...element, place4: !element.place4 } : element))
                break
        }
    }


  return (
    <div className={styles.app}>

        {/* show settings */}
        <div 
            className={styles.settings}
            style={showSettings? {display: 'block'} : {display: 'none'}}
        >
            <button 
                className={styles.settings__close}
                onClick={() => setShowSettings(false)}
                >close</button>
            {selectedElement && elements ? (
                <form>
                    <input 
                    type="text" 
                    placeholder='Enter title for element...'
                    value={elements.map(element => 
                        element.id == selectedElement.id? element.title : ''
                    )}
                    onChange = {(e) => setElements(elements.map(element => 
                        element.id == selectedElement.id? 
                            {...element, title: e.target.value } : 
                            element    
                    ))}
                    /> 
                    {selectedElement.place1? (
                         <input 
                         type="text" 
                         placeholder='Enter 1 title for element...'
                         value={elements.map(element => 
                             element.id == selectedElement.id? element.title1 : ''
                         )}
                         onChange = {(e) => setElements(elements.map(element => 
                             element.id == selectedElement.id? 
                                 {...element, title1: e.target.value } : 
                                 element    
                         ))}
                         /> 
                    ): (<></>)}
                    {selectedElement.place2? (
                         <input 
                         type="text" 
                         placeholder='Enter 2 title for element...'
                         value={elements.map(element => 
                             element.id == selectedElement.id? element.title2 : ''
                         )}
                         onChange = {(e) => setElements(elements.map(element => 
                             element.id == selectedElement.id? 
                                 {...element, title2: e.target.value } : 
                                 element    
                         ))}
                         /> 
                    ): (<></>)}
                    {selectedElement.place3? (
                         <input 
                         type="text" 
                         placeholder='Enter 3 title for element...'
                         value={elements.map(element => 
                             element.id == selectedElement.id? element.title3 : ''
                         )}
                         onChange = {(e) => setElements(elements.map(element => 
                             element.id == selectedElement.id? 
                                 {...element, title3: e.target.value } : 
                                 element    
                         ))}
                         /> 
                    ): (<></>)}
                    {selectedElement.place4? (
                         <input 
                         type="text" 
                         placeholder='Enter 4 title for element...'
                         value={elements.map(element => 
                             element.id == selectedElement.id? element.title4 : ''
                         )}
                         onChange = {(e) => setElements(elements.map(element => 
                             element.id == selectedElement.id? 
                                 {...element, title4: e.target.value } : 
                                 element    
                         ))}
                         /> 
                    ): (<></>)}
                </form>
            ): 
            (<p>not found</p>)}
        </div>

         {/* presentation */}
         <div 
            className={styles.presentation}
            style={showPresentationMode? {display: 'block'} : {display: 'none'}}
        >
             <button 
                className={styles.presentation__mode} 
                onClick={() => 
                    setShowPresentationMode(!showPresentationMode)}
            >Design Mode</button>
            {elements.length != 0? (
                <form>
                    <p>{elements[0].title}</p>
                    <div className="butt"></div>
                </form>
            ): (<p></p>)}
        </div>

        {/* menu */}
        <button 
            className={`${styles.presentation__mode} ${styles.clear}`} 
            onClick={clearPresentation}
        >Clear</button>
        <button 
            className={styles.presentation__mode} 
            onClick={() => setShowPresentationMode(!showPresentationMode)}
        >Presentation Mode</button>

        {/* elements */}
        <div className={styles.app__circles}>
            {elements.map(element => 
                <div className={styles.app_circle} key={element.id} draggable>
                    <div className={styles.app__circle__item}>
                        <button
                            className={styles.app__circle__item__delete}
                            onClick={deleteElement}
                        >D</button>
                        <button
                            className={styles.app__circle__item__edit}
                            onClick={() => showSettingsFunc(element)}
                        >E</button>
                        <span 
                            className={styles.app_circle__one}
                            style={element.place1? 
                                {backgroundColor: 'rgb(99 102 241 / var(--tw-bg-opacity))'}: 
                                {}}
                            onClick={() => crateANewElement(element, 1)}
                            >1</span>
                        <span
                            className={styles.app_circle__two}
                            style={element.place2? 
                                {backgroundColor: 'rgb(99 102 241 / var(--tw-bg-opacity))'}: 
                                {}}
                            onClick={() => crateANewElement(element, 2)}
                            >2</span>
                        <span 
                            className={styles.app_circle__three}
                            style={element.place3?
                                {backgroundColor: 'rgb(99 102 241 / var(--tw-bg-opacity))'}:
                                {}}
                            onClick={() => crateANewElement(element, 3)}
                            >3</span>
                        <span 
                            className={styles.app_circle__four}
                            style={element.place4? 
                                {backgroundColor: 'rgb(99 102 241 / var(--tw-bg-opacity))'}: 
                                {}}
                            onClick={() => crateANewElement(element,4)}
                            >4</span>
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default App
