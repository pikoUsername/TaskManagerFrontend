import { useState } from "react"
import NavigationMapComponent from "../../Components/NavigationMap/NavigationMap";
import { NavProps } from "../../Utils/Types";
import "./TeamList.css"
import data from "../../TestData/TeamsList.json"
import properties from "../../Static/Images/propertiesIcon.svg"
import { NavLink } from "react-router-dom";
import Modal from "../../Modals/Base/Base";
import CreateTeamModal from "../../Modals/Team/CreateTeam";

const TeamsListPage: React.FC<NavProps> = (props: NavProps) => { 
    props.setCategory("teams")
    let elements = new Map<string, string>()
    elements.set("Команды", "/teams")
    let teams = data.teams
    const [isTeamCreateModal, setTeamCreateModal] = useState(false)

    return (
        <div className="teamslist-root">
            <Modal isOpen={isTeamCreateModal} onClose={() => setTeamCreateModal(false)}>
                <CreateTeamModal setIsOpenModal={setTeamCreateModal}/>
            </Modal>
            <NavigationMapComponent elements={elements}/>
            <h1>Команды</h1>
            <div className="teams-container">
                <div className="teams-fields">
                    <div className="teams-field-name">Имя</div>
                    <div className="teams-field-owner">Руководитель</div>
                </div>
                <div className="team-create-button general-button" onClick={() => setTeamCreateModal(true)}>
                    Создать команду
                </div>
            </div>
            <div className="teams-list">
                {teams.map((value) => { 
                    return (
                        <NavLink to={`/team/${value.id}`} className="team-list-container">
                            <div className="team-container-left-content">
                                <div className="team-container-name">
                                    <img src={value.photo.fileUrl} alt="" width={24} height={24} className="avatar-icon"/>
                                    <p className="team-name">{value.name}</p>
                                </div>
                                <div className="team-container-owner">
                                    <img src={value.owner.avatar.fileUrl} alt="" className="avatar-icon"/>
                                    <p className="owner-name">{value.owner.name}</p>
                                </div>
                            </div>
                            <div className="team-container-properties">
                                <img src={properties} alt="" width={24} height={24}/>
                            </div>
                        </NavLink>
                    )
                })}
            </div>
        </div>
    )
}

export default TeamsListPage; 
