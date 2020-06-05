from django import forms


class TagsForm(forms.Form):
    tags = forms.CharField(widget=forms.TextInput(
        attrs={'size': 10, 'placeholder': 'add tags'}), required=True)
