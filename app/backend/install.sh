if ! pyenv -v COMMAND &> /dev/null
then
    echo "installing pyenv"
    curl https://pyenv.run | bash
    echo 'eval "$(pyenv init -)"' >> ~/.bashrc
    eval "$(pyenv init -)"
fi
LATEST=$(pyenv install --list | grep "3\." | grep -v - | grep -v b | tail -1)
pyenv install $LATEST
pyenv local $LATEST
python -m pip install -r requirements.txt
echo "consult README.md to start the server"