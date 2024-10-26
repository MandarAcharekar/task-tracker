import Team from '../models/team.model.js';

export const createTeam = async (req, res) => {
    const { name, members } = req.body;

    try{
        if(!name || !members || members.length === 0){
            return res.status(400).json({ message: `Team name and members are required` });
        }

        const team = new Team({
            name,
            members,
            createdBy: req.user.userId,
        });

        await team.save();

        res.status(201).json({ message: `Team created successfully`, team });
    }catch(error){
        res.status(500).json({ message: `Internal Server Error - ${error.message}` });
    }
};

export const joinTeam = async (req, res) => {
    try {
        const { teamId } = req.params;
        const userId = req.user._id;

        const team = await Team.findById(teamId);
        if (!team){
            return res.status(404).json({ message: `Team not found` });
        }

        if (team.members.includes(userId)){
            return res.status(400).json({ message: `You are already a member of this team` });
        }

        // Add the user to the team
        team.members.push(userId);
        await team.save();

        res.status(200).json({ message: `Successfully joined the team`, team });
    } catch (error) {
        res.status(500).json({ message: `Internal Server Error - ${error.message}` });
    }
};

export const inviteMember = async (req, res) => {
    try{
        const { teamId } = req.params;
        const { userIdToInvite } = req.body;
        const userId = req.user._id;

        const team = await Team.findById(teamId);
        if (!team){
            return res.status(404).json({ message: `Team not found` });
        }

        if (!team.createdBy.equals(userId)) {
            return res.status(403).json({ message: `Only team creator can invite members` });
        }

        // Add the user to the team if not already a member
        if (team.members.includes(userIdToInvite)) {
            return res.status(400).json({ message: `User is already a team member` });
        }

        team.members.push(userIdToInvite);
        await team.save();

        res.status(200).json({ message: `User invited successfully`, team });
    }catch(error){
        res.status(500).json({ message: `Internal Server Error - ${error.message}` });
    }
};

export const getTeamDetails = async (req, res) => {
    try{
        const { teamId } = req.params;

        const team = await Team.findById(teamId).populate('members');
        if (!team){
            return res.status(404).json({ message: `Team not found` });
        }

        res.status(200).json({ message: `Team details fetched successfully`, team });
    }catch(error){
        res.status(500).json({ message: `Internal Server Error - ${error.message}` });
    }
};